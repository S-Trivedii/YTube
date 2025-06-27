import { FaPlay, FaUpload, FaTimes } from "react-icons/fa";

const VideoUploadSection = ({
  videoFile,
  setVideoFile,
  formatFileSize,
  handleVideoUpload,
}) => {
  return (
    <div className="border rounded-lg bg-white p-4 shadow">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        <FaPlay /> Video File
      </h2>
      {!videoFile ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg cursor-pointer text-center text-gray-500 hover:border-blue-500 transition">
          <FaUpload size={40} className="mb-2" />
          <span className="font-medium">Click to select video</span>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
          <div>
            <p className="font-medium">{videoFile.name}</p>
            <p className="text-sm text-gray-500">
              {formatFileSize(videoFile.size)}
            </p>
          </div>
          <button type="button" onClick={() => setVideoFile(null)}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUploadSection;
