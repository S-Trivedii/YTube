import { useState } from "react";
import { Link } from "react-router-dom";

const HoverVideoCard = ({ video, formatDate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { videoUrl, thumbnailUrl, videoName, views, createdAt, _id } = video;

  return (
    <Link to={`/video/${_id}`}>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-32 object-cover cursor-pointer"
          />
        ) : (
          <img
            src={
              thumbnailUrl ||
              "https://via.placeholder.com/300x180.png?text=Thumbnail"
            }
            alt={videoName || "Untitled Video"}
            className="w-full h-32 object-cover"
          />
        )}
        <div className="p-4">
          <h3
            className="font-medium text-base truncate cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {videoName || "Untitled Video"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {views || 0} views • {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HoverVideoCard;
