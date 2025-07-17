import { useEffect, useState } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import CreateChannelBanner from "../components/ui/CreateChannelBanner";
import FilterButtons from "../components/Layout/FilterButtons";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    data: videos,
    loading,
    hasMore,
  } = useInfiniteScroll({
    endpoint: "/video",
    limit: 10,
  });
  const [showCreateCard, setShowCreateCard] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterVideosByCategory =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.videoCategory === selectedCategory);

  useEffect(() => {
    if (localStorage.getItem("banner") === "true") {
      setShowCreateCard(false);
    }
  }, []);

  return (
    <div className="p-4 space-y-8">
      {!showCreateCard && (
        <FilterButtons
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      <CreateChannelBanner
        showCreateCard={showCreateCard}
        setShowCreateCard={setShowCreateCard}
      />

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filterVideosByCategory.map((video) => (
          <Link
            to={`/video/${video._id}`}
            key={video._id}
            className="group bg-white rounded-lg shadow-sm overflow-hidden transform transition duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative w-full h-48 bg-black">
              <video
                className="w-full h-full object-cover"
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                muted
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            </div>

            <div className="p-4 space-y-2">
              {/* Channel Logo + Title */}
              <div className="flex items-start gap-3">
                <img
                  src={video.videoChannel.channelLogo}
                  alt="Channel Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-md font-semibold leading-tight line-clamp-2">
                    {video.videoName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {video.videoChannel.channelName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {loading && (
          <div className="text-center mt-4 col-span-full">
            Loading more videos...
          </div>
        )}

        {!loading && !hasMore && (
          <div className="text-center mt-4 text-gray-500 col-span-full">
            No more videos
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
