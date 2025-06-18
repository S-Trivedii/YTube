import { createChannelRepo } from "../repository/channel.repository.js";

export const createChannelService = async (channelInfo) => {
  const newChannel = await createChannelRepo(channelInfo);

  return newChannel;
};
