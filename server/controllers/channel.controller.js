import {
  createChannelService,
  getChannelService,
} from "../services/channel.service.js";

// Create Channel
export const createChannelController = async (req, res) => {
  try {
    console.log("hello--");
    const { channelName, channelDescription } = req.body;

    // Extract uploaded file URLs
    const channelLogo = req.files?.channelLogo?.[0]?.path || null;
    const channelBanner = req.files?.channelBanner?.[0]?.path || null;

    const userId = req.userId;

    const newChannel = await createChannelService({
      channelName,
      channelLogo,
      channelBanner,
      channelDescription,
      userId,
    });

    return res.status(201).json({
      message: "Channel created successfully",
      success: true,
      channel: newChannel,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get channel
export const getChannelController = async (req, res) => {
  try {
    const userId = req.userId;

    const channelDetails = await getChannelService(userId);

    return res.status(200).json({
      message: "Successfully get channel",
      success: true,
      channelDetails,
    });
  } catch (error) {}
};
