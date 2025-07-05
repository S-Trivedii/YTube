import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import { useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import useFetchVideo from "../hooks/useFetchVideo";
import useFetchAllVideos from "../hooks/useFetchAllVideos";

const SingleVideoPage = () => {
  const { id } = useParams();

  // custom hook
  const { video, loading } = useFetchVideo(id);
  const allVideos = useFetchAllVideos();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { channelLogo, channelName } = useSelector(
    (state) => state.channelSetup
  );

  // only call filter if 'allVideos' is not null and undefined
  const suggestedVideos = allVideos?.filter((v) => v._id !== id) || [];

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center text-3xl items-center h-screen text-red-600">
        Video not found.
      </div>
    );
  }

  const { videoUrl, videoName, videoDescription, views, createdAt } = video;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Video Section */}
          <div className="w-full lg:w-3/4">
            {/* Video Player */}
            <div className="aspect-video bg-black mb-4 rounded-lg overflow-hidden">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Title */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              {videoName}
            </h1>

            {/* Channel Info + Join + Like/Dislike */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              {/* Channel logo + name */}
              <div className="flex items-center gap-3">
                <img
                  src={channelLogo}
                  alt="channel logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm font-medium text-gray-700">
                  {channelName}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-6">
                {/* Join Now */}
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition">
                  Join Now
                </button>

                {/* Like/Dislike */}
                <div className="flex items-center gap-4">
                  <button onClick={handleLike}>
                    <FaThumbsUp
                      className={`text-xl transform transition duration-150 ${
                        liked
                          ? "text-blue-600 scale-125"
                          : "text-gray-500 scale-100"
                      }`}
                    />
                  </button>
                  <button onClick={handleDislike}>
                    <FaThumbsDown
                      className={`text-xl transform transition duration-150 ${
                        disliked
                          ? "text-blue-600 scale-125"
                          : "text-gray-500 scale-100"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-white p-4 rounded-lg shadow-sm text-gray-700">
              <p className="text-sm text-gray-600 mb-2">
                {views || 0} views •{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>{videoDescription || "No description provided."}</p>
            </div>
          </div>

          {/* Suggested Videos Section */}
          <div className="w-full lg:w-1/4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              More from this channel
            </h2>
            <div className="space-y-4">
              {suggestedVideos.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No suggestions available.
                </p>
              ) : (
                suggestedVideos.map((item) => (
                  <Link
                    to={`/video/${item._id}`}
                    key={item._id}
                    className="flex gap-3 hover:bg-gray-200 p-2 rounded-md transition"
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt="video thumbnail"
                      className="w-24 h-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.videoName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {channelName}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVideoPage;
