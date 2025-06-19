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
