import { GoPerson } from "react-icons/go";
import { HiPlusSm } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateChannelBanner = ({ showCreateCard, setShowCreateCard }) => {
  return (
    <>
      {showCreateCard && (
        <div className="relative bg-red-100 p-6 rounded-lg shadow-md w-full text-center flex flex-col items-center">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 cursor-pointer text-red-600 hover:text-red-800"
            onClick={() => {
              setShowCreateCard(false);
              localStorage.setItem("banner", "true");
            }}
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
    </>
  );
};

export default CreateChannelBanner;
