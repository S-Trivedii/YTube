import express from "express";
import {
  createCommentController,
  getAllCommentByIdController,
} from "../controllers/comment.controller.js";
import { auth } from "../middleware/auth.js";

const commentRouter = express.Router();

// only authenticated user can post comment
commentRouter.post("/", auth, createCommentController);

commentRouter.get("/:id", getAllCommentByIdController);

export default commentRouter;
