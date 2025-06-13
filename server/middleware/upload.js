import multer from "multer";

// 'this is storage engine for multer', specifically made for uploading files directly to Cloudinary instead of saving them locally
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Instance of storage enginer - CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary, // this tells storage engine which Cloudinary account to use
  params: async (req, file) => {
    const isAvatar = req.body.type === "avatar";
    return {
      folder: isAvatar ? "avatars" : "images",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: isAvatar ? [{ width: 1080, crop: "limit" }] : [],
    };
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// File size limit: 4MB for avatar only
const limits = {
  fileSize: (req, file) =>
    req.body.type === "avatar" ? 4 * 1024 * 1024 : undefined, // 4MB
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024, // Enforces 4MB for all files.
  },
});

export default upload;

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
