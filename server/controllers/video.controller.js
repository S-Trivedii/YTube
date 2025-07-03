import {
  uploadVideoService,
  getVideoByIdService,
} from "../services/video.service.js";

// Upload video
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

// Get video by id
export const getVideoByIdController = async (req, res) => {
  try {
    const { videoId } = req.params;
    console.log("params ", videoId);

    const video = await getVideoByIdService(videoId);

    return res.status(200).json({
      message: "Successfully retrive video",
      success: true,
      video,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Video retrived failed",
      error: error.message,
      success: false,
    });
  }
};
