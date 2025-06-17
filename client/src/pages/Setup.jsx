import { FaCamera } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelBanner,
  setChannelLogo,
  setChannelName,
  setDescription,
} from "../redux/channelSetupSlice";

const Setup = () => {
  const dispatch = useDispatch();

  const { channelLogo, channelBanner, channelName, channelDescription } =
    useSelector((state) => state.channelSetup);

  const isFormValid = channelLogo && channelName && channelDescription;

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setChannelLogo(URL.createObjectURL(file))); // learn more about URL.createObjectURL(file) below
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setChannelBanner(URL.createObjectURL(file)));
    }
  };

  const handleSubmit = () => {
    // Handle channel creation logic here
    console.log("Channel created:", {
      channelLogo,
      channelName,
      channelBanner,
      channelDescription,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-4xl font-bold text-black mb-2 text-center">
        Create Your Channel
      </h2>
      <p className="text-xl font-medium text-red-500 text-center mb-6">
        Set up your channel to start sharing your content with the world
      </p>

      {/* Logo and Channel Name */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        {/* Logo Upload */}
        <div className="relative w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
          {channelLogo ? (
            <img
              src={channelLogo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <label
              htmlFor="logo-upload"
              className="flex flex-col items-center justify-center cursor-pointer text-gray-500"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaCamera className="text-2xl" />
              </div>
              <span className="text-sm mt-2">Upload Logo</span>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
          )}
        </div>

        {/* Channel Name Input */}
        <div className="flex-1 w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Channel Name
          </label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => dispatch(setChannelName(e.target.value))}
            placeholder="Enter channel name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Banner Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Channel Banner (Optional)
        </label>
        <label
          htmlFor="banner-upload"
          className="w-full border-2 border-dotted border-gray-400 rounded-md flex flex-col items-center justify-center h-40 cursor-pointer text-gray-500 hover:bg-gray-50"
        >
          {channelBanner ? (
            <img
              src={channelBanner}
              alt="Banner Preview"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <>
              <LuUpload className="text-4xl mb-2 text-gray-400" />
              <span className="text-md text-black mt-1 font-medium">
                Upload Channel Banner
              </span>
            </>
          )}
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerChange}
          />
        </label>
        <p className="text-sm text-gray-400 mt-1">
          Recommended: 2560 x 1440 pixels
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">
          Channel Description
        </label>
        <textarea
          value={channelDescription}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          rows={5}
          placeholder="Write something about your channel..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-md text-white font-medium transition ${
            isFormValid
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-300 cursor-not-allowed"
          }`}
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default Setup;

/*

e.target.files[0] 
1. his gets the first file selected by the user from the file input (<input type="file" />
2. It returns a File object (e.g., an image)
 
---

URL.createObjectURL(file) -> this creates a temporary local URL (blob URL)
It allows you to preview a selected image immediately (e.g., in an <img src={channelLogo} />), without uploading it.

Limitation of URL.createObjectURL(file)
1. It exists only in the browser’s memory
2. It becomes invalid after a page refresh

This is why for persistent storage (like saving to localStorage or DB), it's 
better to convert the file to base64 using FileReader.

*/
