import React from "react";
import { useSelector } from "react-redux";

const UserChannel = () => {
  const { channelBanner, channelLogo, channelName, channelDescription } =
    useSelector((state) => state.channelSetup);

  const videos = []; // Replace with actual video data from your backend or store

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      {/* Banner */}
      <div
        className="w-full h-48 sm:h-64 md:h-60 lg:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: channelBanner
            ? `url(${channelBanner})`
            : "linear-gradient(to right, #4f46e5, #3b82f6)",
        }}
      />

      {/* Channel Info */}
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 -mt-12 sm:-mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-4">
        {/* Channel Logo */}
        <img
          src={
            channelLogo || "https://via.placeholder.com/100x100.png?text=Logo"
          }
          alt="Channel Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-md"
        />

        {/* Name & Description */}
        <div className="flex flex-col sm:ml-4 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {channelName || "Channel Name"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {channelDescription || "Channel description goes here..."}
          </p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Videos</h2>

        {videos.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-white rounded-md shadow-sm">
            No videos exist yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChannel;
