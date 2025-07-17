import { Link } from "react-router-dom";

const SuggestedVideos = ({ suggestedVideos, channelName }) => {
  return (
    <div className="w-full lg:w-1/4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        More from this channel
      </h2>
      <div className="space-y-4">
        {suggestedVideos.length === 0 ? (
          <p className="text-gray-500 text-sm">No suggestions available.</p>
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
                <p className="text-xs text-gray-500 truncate">{channelName}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SuggestedVideos;
