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
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserValidation, registerUserController);
userRouter.post("/login", loginUserValidation, loginUserController);

export default userRouter;
