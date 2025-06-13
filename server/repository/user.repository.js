// All query related to db are here in repository layer

import { User } from "../schema/user.model.js";

export const findUserByEmailRepo = async (email) => {
  return await User.findOne({ email });
};

export const findUserByUsernameRepo = async (username) => {
  return await User.findOne({ username });
};

export const createUserRepo = async ({ username, email, password }) => {
  const user = await User.create({ username, email, password });

  // Convert Mongoose doc to plain JS object
  const userObj = user.toObject();

  // Remove password before returning
  delete userObj.password;

  return userObj;
};

export const uploadAvatarRepo = async (path, userId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: path },
    { new: true } // return the updated document
  ).select("-password");

  return updatedUser;
};
