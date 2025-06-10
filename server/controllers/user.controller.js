import {
  loginUserService,
  registerUserService,
} from "../services/user.service.js";

// Register Controller
export const registerUserController = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);

    return res.status(201).json({
      newUser,
      success: true,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
};

// Login Controller
export const loginUserController = async (req, res) => {
  // console.log("login controller");
  try {
    const { user, token } = await loginUserService(req.body);

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };

    res.cookie("token", token, cookieOptions);

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
