import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// --- Helper functions ---

const getImageParams = (file) => {
  let folder = "images";
  let transformation = [];

  if (file.fieldname === "avatar") {
    folder = "avatars";
    transformation = [{ width: 1080, crop: "limit" }];
  } else if (file.fieldname === "thumbnail") {
    folder = "thumbnails";
  }

  return {
    folder,
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation,
    resource_type: "image",
  };
};

const getVideoParams = () => ({
  folder: "videos_yt",
  allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
  resource_type: "video",
});

// --- Storage engines ---

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => getImageParams(file),
});

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => getVideoParams(),
});

const dynamicStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) =>
    file.mimetype.startsWith("video/")
      ? getVideoParams()
      : getImageParams(file),
});

// --- File filters ---

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const videoFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// --- Multer upload instances ---

// Image-only uploader
const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

// Video-only uploader
const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
});

// Mixed uploader (video + thumbnail, avatar, etc.)
const mixedUpload = multer({
  storage: dynamicStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      videoFileFilter(req, file, cb);
    } else if (file.mimetype.startsWith("image/")) {
      imageFileFilter(req, file, cb);
    } else {
      cb(new Error("Invalid file type!"), false);
    }
  },
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max per file
  },
});

// Helper for routes: use as mixedUpload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])

export { imageUpload, videoUpload, mixedUpload };
