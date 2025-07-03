import { uploadVideoRepo } from "../repository/video.repository.js";

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
