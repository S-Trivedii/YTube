import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HoverVideoCard from "./HoverVideoCard";

const VideoGallery = ({ videos }) => {
  const { loading } = useSelector((state) => state.videos);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 mt-10 mb-10">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800">Videos</h2>
      <hr className="border-gray-300 my-3" />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : videos.length === 0 ? (
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
          {videos.map((video) => (
            <HoverVideoCard
              key={video._id}
              video={video}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
