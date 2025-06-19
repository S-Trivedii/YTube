import { LuUpload } from "react-icons/lu";

const UploadBanner = ({ previewBanner, handleBannerChange }) => {
  return (
    <label
      htmlFor="banner-upload"
      className="w-full border-2 border-dotted border-gray-400 rounded-md flex flex-col items-center justify-center h-40 cursor-pointer text-gray-500 hover:bg-gray-50"
    >
      {previewBanner ? (
        <img
          src={previewBanner}
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
  );
};

export default UploadBanner;
