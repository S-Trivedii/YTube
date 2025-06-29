import express from "express";
import {
  createChannelController,
  getChannelController,
} from "../controllers/channel.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const channelRouter = express.Router();

channelRouter.get("/user", auth, getChannelController);

channelRouter.post(
  "/create",
  auth,
  upload.fields([
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

export default channelRouter;
