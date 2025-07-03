import { uploadVideoService } from "../services/video.service.js";

export const uploadVideoController = async (req, res) => {
  try {
    // const { videoTitle, videoDescription, videoCategory, isPublic } = req.body;
    const videoData = req.body;
    const userId = req.userId;

    console.log("Video data -controller ", videoData);

    const videoFile = req.files?.video?.[0]?.path || null;
    const thumbnailFile = req.files?.thumbnail?.[0]?.path || null;

    console.log("Video file - controller ", videoFile);
    console.log("Thumbnail file - controller ", thumbnailFile);

    if (!videoFile)
      return res.status(400).json({
        success: false,
        message: "Video is required.",
      });

    const newVideo = await uploadVideoService({
      videoData,
      videoFile,
      thumbnailFile,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Video upload failed",
      error: error.message,
      success: false,
    });
  }
};
