import { FaCamera } from "react-icons/fa";

const UploadLogo = ({ previewLogo, handleLogoChange }) => {
  return (
    <div className="relative w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
      {previewLogo ? (
        <img
          src={previewLogo}
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
  );
};

export default UploadLogo;
