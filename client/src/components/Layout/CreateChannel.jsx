import { LuVideo } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CreateChannel = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="text-5xl sm:text-6xl text-red-600 flex justify-center mb-4">
          <IoPersonOutline />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Create Your Channel
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto my-2">
          You need a channel to upload videos, comment, or create playlists.
        </p>
        <p className="text-gray-400 text-sm sm:text-base mb-4">
          Get started on your content creation journey and share your voice with
          the world.
        </p>

        {/* Responsive Button */}
        <div className="flex justify-center">
          <Link
            to="/channel/setup"
            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-base sm:text-lg font-medium shadow-md"
          >
            <FaPlus className="text-white text-md" />
            <span>Create Channel</span>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          It only takes a few minutes to set up your channel.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Feature Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <div className="text-4xl sm:text-5xl text-red-600 mb-4">
            <LuVideo />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Upload Videos
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Share your content with the world and build your audience.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <div className="text-4xl sm:text-5xl text-red-600 mb-4">
            <BsFillPersonFill />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Build Community
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Connect with viewers and grow your subscriber base.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <div className="text-4xl sm:text-5xl text-red-600 mb-4">
            <LuVideo />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Upload Videos
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Share your content with the world and build your audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
