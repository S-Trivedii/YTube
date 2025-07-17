import {
  uploadVideoRepo,
  getVideoByIdRepo,
  getAllVideosRepo,
} from "../repository/video.repository.js";

export const uploadVideoService = async ({
  videoData,
  videoFile,
  thumbnailFile,
  userId,
}) => {
  console.log("Inside service");
  const video = await uploadVideoRepo({
    videoData,
    videoFile,
    thumbnailFile,
    userId,
  });

  console.log("service output ", video);

  return video;
};

export const getVideoByIdService = async (videoId) => {
  const video = await getVideoByIdRepo(videoId);

  return video;
};

export const getAllVideosService = async (offset, limit) => {
  return await getAllVideosRepo(offset, limit);
};
