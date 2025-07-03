import { Video } from "../schema/video.model.js";
import { Channel } from "../schema/channel.model.js";
import { User } from "../schema/user.model.js";

export const uploadVideoRepo = async ({
  videoData,
  videoFile,
  thumbnailFile,
  userId,
}) => {
  const channel = await Channel.findOne({ channelOwner: userId });

  const video = await Video.create({
    videoName: videoData.videoTitle,
    videoDescription: videoData.videoDescription,
    videoCategory: videoData.videoCategory,
    videoPublic: videoData.isPublic,
    videoUrl: videoFile,
    thumbnailUrl: thumbnailFile,
    videoChannel: channel._id, // channel._id is the channel id
    videoOwner: userId, // userId is the user id
  });

  console.log("video from repo ", video);

  await User.findByIdAndUpdate(userId, { $push: { videos: video._id } });

  return video;
};
