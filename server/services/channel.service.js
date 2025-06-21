import {
  createChannelRepo,
  getChannelRepo,
} from "../repository/channel.repository.js";

export const createChannelService = async (channelInfo) => {
  const newChannel = await createChannelRepo(channelInfo);

  return newChannel;
};

export const getChannelService = async (userId) => {
  return await getChannelRepo(userId);
};
