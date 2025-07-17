import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoName: {
      type: String,
      required: true,
      trim: true,
    },
    videoDescription: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: false,
    },
    videoCategory: {
      type: String,
      enum: [
        "education",
        "entertainment",
        "gaming",
        "music",
        "news",
        "sports",
        "technology",
        "travel",
        "others",
      ],
      required: true,
    },
    videoPublic: {
      type: Boolean,
      default: true,
    },
    videoChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    videoOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // important for .sort()
);

export const Video = mongoose.model("Video", videoSchema);
