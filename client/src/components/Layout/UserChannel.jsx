import { useDispatch, useSelector } from "react-redux";
import VideoGallery from "../ui/VideoGallary";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { setAllVideos, setError, setLoading } from "../../redux/videoSlice";

const UserChannel = () => {
  const dispatch = useDispatch();
  const { channelBanner, channelLogo, channelName, channelDescription } =
    useSelector((state) => state.channelSetup);

  const { allVideos } = useSelector((state) => state.videos);

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const username = `@${savedUser.username}`;
  const subscribers = "12.3K subscribers";
  const videoCount = `${allVideos.length} videos`;

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get("/channel/videos");
        // console.log("videos--> ", response.data);
        dispatch(setAllVideos(response.data.videos));
        // console.log("fetch all videos of user ", videos);
      } catch (error) {
        dispatch(setError("Failed to load videos"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchChannelVideos();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Banner */}
      <div
        className="w-[90%] max-h-[220px] h-32 sm:h-36 md:h-44 lg:h-[220px] bg-cover bg-center rounded-xl mt-2 shadow-sm"
        style={{
          backgroundImage: channelBanner
            ? `url(${channelBanner})`
            : "linear-gradient(to right, #4f46e5, #3b82f6)",
        }}
      />

      {/* Channel Info Section */}
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mt-6 flex flex-col sm:flex-row items-start gap-6">
        {/* Channel Logo */}
        <div className="flex-shrink-0">
          <img
            src={
              channelLogo || "https://via.placeholder.com/150x150.png?text=Logo"
            }
            alt="Channel Logo"
            className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-md bg-white"
          />
        </div>

        {/* Channel Details */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {channelName || "Channel Name"}
          </h1>

          <div className="text-sm sm:text-base text-gray-600 mt-1">
            <span className="mr-2 text-gray-700">{username}</span> •{" "}
            <span className="mx-2">{subscribers}</span> •{" "}
            <span>{videoCount}</span>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {channelDescription || "Channel description goes here..."}
          </p>

          <button className="mt-4 px-5 py-2 bg-black text-white rounded-3xl w-fit font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {/* Videos Section */}
      <VideoGallery videos={allVideos} />
    </div>
  );
};

export default UserChannel;
