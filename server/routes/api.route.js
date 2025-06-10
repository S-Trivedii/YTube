import express from "express";
import userRouter from "./user.route.js";

const apiRouter = express.Router();

// all route starting with '/user' will be routed to userRouter
apiRouter.use("/user", userRouter);

export default apiRouter;
