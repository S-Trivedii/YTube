import express from "express";
import userRouter from "./user.route.js";
import channelRouter from "./channel.route.js";

const apiRouter = express.Router();

// all route starting with '/user' will be routed to userRouter
apiRouter.use("/user", userRouter);

// all route starting with '/channel' will be routed to channelRouter
apiRouter.use("/channel", channelRouter);

export default apiRouter;
