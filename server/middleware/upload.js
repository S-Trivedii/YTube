import multer from "multer";

// 'this is storage engine for multer', specifically made for uploading files directly to Cloudinary instead of saving them locally
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Storage for images (avatars, thumbnails, general images)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
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
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "videos_yt",
      allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
      resource_type: "video",
    };
  },
});

const dynamicStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("video/")) {
      return {
        folder: "videos_yt",
        allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
        resource_type: "video",
      };
    }

    // For images
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
  },
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// File filter for videos
const videoFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Multer instance for images
const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB for all types images
  },
});

// Multer instance for videos
const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB for videos
  },
});

// Multer instance for mixed uploads (e.g., video + thumbnail)
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
    fileSize: 500 * 1024 * 1024, // Max for any file (images will likely be smaller anyway)
  },
});

// Helper for routes: use as mixedUpload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])

export { imageUpload, videoUpload, mixedUpload };

/*
 params function - It gives Cloudinary instruction on how to handle the incoming file. This function 
will return a configuration object something like this:

{
  asset_id: "abc123...",
  public_id: "avatars/1710000000000-logo.png",
  secure_url: "https://res.cloudinary.com/<cloud-name>/image/upload/v1710000000/avatars/1710000000000-logo.png",
  url: "http://res.cloudinary.com/<cloud-name>/image/upload/v1710000000/avatars/1710000000000-logo.png",
  // ... more metadata
}

*/
