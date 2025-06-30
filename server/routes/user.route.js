import express from "express";

// Validation
import {
  registerUserValidation,
  loginUserValidation,
} from "../validators/user.validation.js";

// Controllers
import {
  registerUserController,
  loginUserController,
  uploadAvatarController,
} from "../controllers/user.controller.js";

// Middleware
import { imageUpload } from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserValidation, registerUserController);
userRouter.post("/login", loginUserValidation, loginUserController);
userRouter.post(
  "/upload",
  auth,
  imageUpload.single("avatar"),
  uploadAvatarController
);

export default userRouter;
