import express from "express";

import {
  createChannelController,
  getChannelController,
  getUserChannelVideosController,
} from "../controllers/channel.controller.js";

import { auth } from "../middleware/auth.js";
import { imageUpload } from "../middleware/upload.js";

const channelRouter = express.Router();

// Get user channel
channelRouter.get("/user", auth, getChannelController);

// Post logo and banner of user channel
channelRouter.post(
  "/create",
  auth,
  imageUpload.fields([
    {
      name: "channelLogo",
      maxCount: 1,
    },
    {
      name: "channelBanner",
      maxCount: 1,
    },
  ]),
  createChannelController
);

// Get all videos of a user
channelRouter.get("/videos", auth, getUserChannelVideosController);

export default channelRouter;
