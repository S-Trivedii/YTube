import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

import {
  setChannelBanner,
  setChannelLogo,
  setChannelName,
  setDescription,
  setIsChannelExist,
} from "../redux/channelSetupSlice";

import UploadLogo from "../components/ui/UploadLogo";
import UploadBanner from "../components/ui/UploadBanner";
import ChannelInput from "../components/ui/ChannelInput";
import { useEffect } from "react";

const Setup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // storing blob URL temperorly
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);

  // real file object
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const { channelName, channelDescription } = useSelector(
    (state) => state.channelSetup
  );

  const isFormValid = logoFile && channelName && channelDescription;

  useEffect(() => {
    const allExist = logoFile && channelName && channelDescription; // true or false
    dispatch(setIsChannelExist(allExist));
  }, [logoFile, channelName, channelDescription, dispatch]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewBanner(URL.createObjectURL(file));
      setBannerFile(file);
    }
  };

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple click
    setLoading(true); // Show 'Create Channel'

    const formData = new FormData();
    formData.append("channelLogo", logoFile);

    // if condition since banner is optional
    if (bannerFile) formData.append("channelBanner", bannerFile);
    formData.append("channelName", channelName);
    formData.append("channelDescription", channelDescription);

    try {
      const response = await axios.post("/channel/create", formData);
      if (response.data.success) {
        dispatch(setChannelLogo(response.data.channel.channelLogo));
        dispatch(setChannelBanner(response.data.channel.channelBanner));
        navigate("/channel");
      }
    } catch (error) {
      console.error("Error uploading channel:", error);
    } finally {
      setLoading(false); // Hide 'creating...'
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-4xl font-bold text-black mb-2 text-center">
        Create Your Channel
      </h2>
      <p className="text-xl font-medium text-red-500 text-center mb-6">
        Set up your channel to start sharing your content with the world
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <UploadLogo
          previewLogo={previewLogo}
          handleLogoChange={handleLogoChange}
        />
        <div className="flex-1 w-full">
          <ChannelInput
            label="Channel Name"
            value={channelName}
            onChange={(e) => dispatch(setChannelName(e.target.value))}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Channel Banner (Optional)
        </label>
        <UploadBanner
          previewBanner={previewBanner}
          handleBannerChange={handleBannerChange}
        />
        <p className="text-sm text-gray-400 mt-1">
          Recommended: 2560 x 1440 pixels
        </p>
      </div>

      <ChannelInput
        label="Channel Description"
        value={channelDescription}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        rows={5}
      />

      <div className="flex justify-end gap-4 mt-6">
        <button className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-md text-white font-medium transition ${
            !isFormValid || loading
              ? "bg-red-300 cursor-not-allowed"
              : "cursor-pointer bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </div>
    </div>
  );
};

export default Setup;

// /*

// e.target.files[0]
// 1. this gets the first file selected by the user from the file input (<input type="file" />
// 2. It returns a File object (e.g., an image)

// ---

// URL.createObjectURL(file) -> this creates a temporary local URL (blob URL)
// It allows you to preview a selected image immediately (e.g., in an <img src={channelLogo} />), without uploading it.

// Limitation of URL.createObjectURL(file)
// 1. It exists only in the browser’s memory
// 2. It becomes invalid after a page refresh

// This is why for persistent storage (like saving to localStorage or DB), it's
// better to convert the file to base64 using FileReader.

// */
