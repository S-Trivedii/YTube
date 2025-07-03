import { Channel } from "../schema/channel.model.js";
import { User } from "../schema/user.model.js";

export const createChannelRepo = async ({
  channelName,
  channelLogo,
  channelBanner,
  channelDescription,
  userId,
}) => {
  // create and save channel doc
  const newChannel = await Channel.create({
    channelName,
    channelLogo,
    channelBanner,
    channelDescription,
    channelOwner: userId,
  });

  // Update user's channelId with the new channel's _id
  await User.findByIdAndUpdate(userId, {
    channelId: newChannel._id,
  });

  return newChannel;
};

export const getChannelRepo = async (userId) => {
  return await Channel.findOne({ channelOwner: userId }).populate(
    "channelOwner",
    "username"
  );
};

// Find all videos of user
export const getUserChannelVideosRepo = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "videos", // Field in User model to populate
    model: "Video", // Mongoose model to populate from
    match: { videoPublic: true }, // Filter: only public videos
    select: "videoName videoDescription thumbnailUrl videoUrl videoCategory",
  });

  return user?.videos || [];
};

/*
Mongoose's .populate() replaces ObjectIds in a field (like videos: [ObjectId, ...]) with 
the actual documents from the referenced collection (Video in this case).

*/
