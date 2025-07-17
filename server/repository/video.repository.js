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

  await User.findByIdAndUpdate(userId, { $push: { videos: video._id } });
  return video;
};

export const getVideoByIdRepo = async (videoId) => {
  const video = await Video.findOne({ _id: videoId })
    .populate({
      path: "videoChannel",
      select: "channelLogo channelName",
    })
    .lean();

  // lean() return a plain JS object. It does not have method like .save() since it is not a document. lean() is good for read operation
  return video;
};

export const getAllVideosRepo = async (offset, limit) => {
  const videos = await Video.find()
    .populate({
      path: "videoChannel",
      select: "channelLogo channelName",
    })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const totalCount = await Video.countDocuments();

  return { videos, totalCount };
};
