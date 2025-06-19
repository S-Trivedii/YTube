import { useSelector } from "react-redux";
import CreateChannel from "../components/Layout/CreateChannel";
import UserChannel from "../components/Layout/UserChannel";

const Channel = () => {
  const { isChannelExist } = useSelector((state) => state.channelSetup);
  return isChannelExist ? <UserChannel /> : <CreateChannel />;
};

export default Channel;
