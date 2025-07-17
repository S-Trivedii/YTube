import { useState } from "react";

const DescriptionBox = ({ videoDescription }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const charLimit = 150;

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev); // current state value in callback
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-sm text-black">
      <p className="text-sm text-black whitespace-pre-line">
        {videoDescription.length <= charLimit || showFullDescription
          ? videoDescription
          : `${videoDescription.substring(0, charLimit)}...`}
      </p>
      {videoDescription.length > charLimit && (
        <button
          onClick={toggleDescription}
          className="text-black text-sm font-bold cursor-pointer mt-2 focus:outline-none hover:underline"
        >
          {showFullDescription ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
