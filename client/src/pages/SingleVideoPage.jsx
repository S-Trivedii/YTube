import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleVideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { allVideos } = useSelector((state) => state.videos);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get(`/video/${id}`);
        setVideo(res.data.video);
      } catch (err) {
        console.error("Failed to load video", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const suggestedVideos = allVideos.filter((v) => {
    return v._id !== id;
  });

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

  const { videoUrl, videoName, videoDescription } = video;

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

            {/* Video Info */}
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {videoName}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                150K views • 2 days ago
              </p>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-lg shadow-sm text-gray-700">
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
                      alt="videothumbnail"
                      className="w-24 h-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.videoName}
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
