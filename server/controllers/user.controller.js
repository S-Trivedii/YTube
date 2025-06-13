import {
  loginUserService,
  registerUserService,
  uploadAvatarService,
} from "../services/user.service.js";

// utils
import { getCookieOptions } from "../utils/cookieOptions.js";

// Register Controller
export const registerUserController = async (req, res) => {
  try {
    const { user, token } = await registerUserService(req.body);

    res.cookie("token", token, getCookieOptions());

    return res.status(201).json({
      user,
      success: true,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
};

// Avatar Controller
export const uploadAvatarController = async (req, res) => {
  try {
    const imageUrl = req?.file?.path; // Cloudinary URL

    if (!imageUrl) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("image url ", imageUrl);

    const updatedUser = await uploadAvatarService({
      path: imageUrl,
      userId: req.userId,
    });

    console.log("updated User ", updatedUser);

    return res.json({
      message: "Upload successful",
      url: imageUrl,
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Login Controller
export const loginUserController = async (req, res) => {
  // console.log("login controller");
  try {
    const { user, token } = await loginUserService(req.body);

    res.cookie("token", token, getCookieOptions());

    return res.status(200).json({
      user,
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
};
