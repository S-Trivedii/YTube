import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";

const VideoGallery = ({ videos }) => {
  return (
    <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mt-10 mb-10">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800">Videos</h2>

      <hr className="border-gray-300 my-3" />

      {videos.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-md shadow-sm">
          <p className="mb-4">No videos exist yet.</p>
          <Link
            to={"/video/upload"}
            className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-md cursor-pointer transition font-semibold"
          >
            <FaUpload className="text-white" />
            Upload Video
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  video.thumbnail ||
                  "https://via.placeholder.com/300x180.png?text=Thumbnail"
                }
                alt={video.title || "Video"}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {video.title || "Untitled Video"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {video.views || 0} views
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
