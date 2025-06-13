import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import {
  findUserByEmailRepo,
  createUserRepo,
  findUserByUsernameRepo,
  uploadAvatarRepo,
} from "../repository/user.repository.js";

// Register user service
export const registerUserService = async ({ username, email, password }) => {
  const existingUserByEmail = await findUserByEmailRepo(email);
  const existingUserByUsername = await findUserByUsernameRepo(username);

  if (existingUserByEmail) {
    throw createHttpError(409, "Account already exists with this email");
  }

  if (existingUserByUsername) {
    throw createHttpError(409, "Account already exists with this username");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const savedUser = await createUserRepo({
    username,
    email,
    password: hashPassword,
  });

  const userForClient = savedUser.toObject();
  delete userForClient.password;

  // Auto-login: generate token
  const tokenData = {
    userId: savedUser._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user: userForClient, token }; // sending token to controller
};

// Upload Avatar Service
export const uploadAvatarService = async ({ path, userId }) => {
  const updatedUser = await uploadAvatarRepo(path, userId);

  if (!updatedUser) {
    throw createHttpError(404, "User not found");
  }

  return updatedUser;
};

// Login user service
export const loginUserService = async ({ identifier, password }) => {
  // identifier might be an email or user, first we have find weather identifier is email or username to fetch document
  // console.log("login user service");
  const isEmail = identifier.includes("@");

  let user;
  if (isEmail) {
    user = await findUserByEmailRepo(identifier);
  } else {
    user = await findUserByUsernameRepo(identifier);
  }

  if (!user) {
    throw createHttpError(401, "User does not exist");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password); // boolean
  if (!isPasswordMatch) {
    throw createHttpError(401, "Invalid credentials."); // Or return a specific error/status
  }

  const userForClient = user.toObject();
  delete userForClient.password;

  // Payload
  const tokenData = {
    userId: user._id,
  };

  // Sign jwt token (token creation)
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user: userForClient, token };
};
