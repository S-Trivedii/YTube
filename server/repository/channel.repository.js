import { Channel } from "../schema/channel.model.js";

export const createChannelRepo = async ({
  channelName,
  channelLogo,
  channelBanner,
  channelDescription,
  userId,
}) => {
  // save channel doc

  const newChannel = await Channel.create({
    channelName,
    channelLogo,
    channelBanner,
    channelDescription,
    channelOwner: userId,
  });

  return newChannel;
};
