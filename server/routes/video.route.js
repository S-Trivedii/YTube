import express from "express";
import { auth } from "../middleware/auth.js";
import {
  uploadVideoController,
  getVideoByIdController,
  getAllVideosController,
} from "../controllers/video.controller.js";
import { mixedUpload } from "../middleware/upload.js";
const videoRouter = express.Router();

// Get all videos for Home Page
videoRouter.get("/", getAllVideosController);

// Upload video
videoRouter.post(
  "/upload",
  auth,
  mixedUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }, // naming should match with formData from frontend
  ]),
  uploadVideoController
);

// Get single video by id
videoRouter.get("/:videoId", auth, getVideoByIdController);

export default videoRouter;

/*

About - multer.fields(...)

When you use multer.fields(...), Multer parses the incoming multipart/form-data (usually from a <form> or FormData) and attaches the uploaded files to req.files as an object where:
   - Each key is the name you defined (like "video" and "image")
   - Each value is an array of file objects, even if there's only one

So after upload:
 req.files = {
  video: [ { fieldname: "video", path: "...", mimetype: "video/mp4", ... } ],
  image: [ { fieldname: "image", path: "...", mimetype: "image/png", ... } ]
};


const videoFile = req.files["video"]?.[0];
const imageFile = req.files["image"]?.[0];


*/
