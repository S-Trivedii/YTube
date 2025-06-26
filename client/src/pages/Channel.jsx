import { useDispatch, useSelector } from "react-redux";

import CreateChannel from "../components/Layout/CreateChannel";
import UserChannel from "../components/Layout/UserChannel";

import { useEffect, useState } from "react";

import axios from "../utils/axiosInstance";

import {
  setIsChannelExist,
  setChannelLogo,
  setChannelName,
  setChannelBanner,
  setDescription,
} from "../redux/channelSetupSlice";

const Channel = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { isChannelExist } = useSelector((state) => state.channelSetup); // initially false since redux data is not persisted

  // Fetching channel Details
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get("/channel/user");
        const channel = response.data.channelDetails;

        if (channel) {
          dispatch(setIsChannelExist(true));
          dispatch(setChannelLogo(channel.channelLogo));
          dispatch(setChannelBanner(channel.channelBanner));
          dispatch(setChannelName(channel.channelName));
          dispatch(setDescription(channel.channelDescription));
        } else {
          dispatch(setIsChannelExist(false));
        }
      } catch (err) {
        console.error("Failed to fetch channel", err);
        dispatch(setIsChannelExist(false));
      } finally {
        setLoading(false); // Hide loading after API call finishes
      }
    };

    fetchChannel();
  }, [dispatch]);

  // Show loading until fetch is done
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium text-gray-700">
        Loading channel data...
      </div>
    );
  }

  // console.log(isChannelExist);
  return <div>{isChannelExist ? <UserChannel /> : <CreateChannel />}</div>;
};

export default Channel;
