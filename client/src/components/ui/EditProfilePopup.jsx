import { useEffect, useRef, useState } from "react";
import { FaTimes, FaCamera } from "react-icons/fa";

const EditProfilePopup = ({ onClose, onSave }) => {
  const popupRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isImageValid, setIsImageValid] = useState(false);
  const [preview, setPreview] = useState(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // clean-up function
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Load image to check its size

    const img = new Image();
    const objectURL = URL.createObjectURL(file); // creates a temporary URL pointing to the uploaded file so it can be loaded and previewed in the browser.
    img.onload = () => {
      if (img.width <= 1080) {
        setImage(file);
        setPreview(objectURL);
        setIsImageValid(true);
      } else {
        alert("Image width must be 1080px or less.");
        setImage(null);
        setPreview(null);
        setIsImageValid(false);
      }
    };
    img.src = objectURL;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-50">
      <div
        ref={popupRef}
        className="bg-gray-50 p-6 w-[90%] max-w-md rounded shadow-md relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold text-center mb-4">Edit Profile</h2>

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-2">
          <label className="relative w-[120px] h-[120px] bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaCamera className="text-2xl text-gray-600" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Only images up to 1080px width allowed
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-sm text-white ${
              isImageValid
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            disabled={!isImageValid}
            onClick={() => {
              onSave(image);
              onClose();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
