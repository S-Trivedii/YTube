import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    channelLogo: {
      type: String,
      default: null,
    },
    channelBanner: {
      type: String,
      default: null,
    },
    channelDescription: {
      type: String,
      default: `Welcome to my channel...`,
    },
    channelOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Add index explicitly (although `unique: true` already creates one)
// channelSchema.index({ channelName: 1 });

export const Channel = mongoose.model("Channel", channelSchema);
