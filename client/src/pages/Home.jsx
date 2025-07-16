import { GoPerson } from "react-icons/go";
import { HiPlusSm } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

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

  return (
    <div className="p-4 space-y-8">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="border p-4 mb-3 rounded shadow-sm bg-white"
          >
            <h2 className="font-semibold">{video.videoName}</h2>
            {/* Add more video info here */}
          </div>
        ))}

        {loading && (
          <div className="text-center mt-4">Loading more videos...</div>
        )}

        {!loading && !hasMore && (
          <div className="text-center mt-4 text-gray-500">No more videos</div>
        )}
      </div>

      {/* Create Channel Card with Close Button */}
      {showCreateCard && (
        <div className="relative bg-red-100 p-6 rounded-lg shadow-md w-full text-center flex flex-col items-center">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 cursor-pointer text-red-600 hover:text-red-800"
            onClick={() => setShowCreateCard(false)}
          >
            <FaTimes />
          </button>

          <div className="text-5xl text-red-600 mb-4">
            <GoPerson />
          </div>
          <h2 className="text-xl font-semibold text-red-900 mb-2">
            Create Your Channel
          </h2>
          <p className="text-lg text-red-600 max-w-4xl mb-4">
            Start your journey as a content creator. Create your channel to
            upload and share videos with the world.
          </p>
          <Link
            to="/channel/setup"
            className="flex items-center cursor-pointer gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            <HiPlusSm className="text-lg" />
            Create Channel
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

// {
//   /* {[...Array(9)].map((_, i) => (
//           <div key={i} className="bg-white rounded shadow-sm p-2">
//             <div className="w-full h-40 bg-gray-300 mb-2"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
//             <div className="h-4 bg-gray-100 rounded w-1/2"></div>
//           </div>
//         ))} */
// }
