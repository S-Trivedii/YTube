import mongoose from "mongoose";

// These validations run when you try to save a document using Mongoose like newUser.save()

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username is required"],
      trim: true,
      minLength: [3, "Username must be atleast 3 characters long"],
      maxLength: [20, "Username must not exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [100, "Password is too long"],
    },
    avatar: {
      type: String,
      default: null,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      default: null,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export const User = mongoose.model("User", userSchema);
