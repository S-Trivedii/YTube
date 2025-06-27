import { FaCalendarAlt } from "react-icons/fa";

const PublishSection = ({ isUploading, uploadProgress, videoFile, title }) => {
  return (
    <div className="border rounded-lg bg-white p-4 shadow space-y-4">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        <FaCalendarAlt /> Publish
      </h2>
      {isUploading && (
        <div>
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={!videoFile || !title.trim() || isUploading}
        className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded hover:bg-blue-700"
      >
        {isUploading ? "Uploading..." : "Publish Video"}
      </button>
    </div>
  );
};

export default PublishSection;
