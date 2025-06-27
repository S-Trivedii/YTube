import { FaImage } from "react-icons/fa";

const ThumbnailUpload = ({
  thumbnailFile,
  setThumbnailFile,
  handleThumbnailUpload,
}) => {
  return (
    <div className="border rounded-lg bg-white p-4 shadow">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        <FaImage /> Thumbnail
      </h2>
      {!thumbnailFile ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg cursor-pointer text-center text-gray-500 hover:border-blue-500 transition">
          <FaImage size={32} className="mb-2" />
          <span className="font-medium">Click to select thumbnail</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div>
          <img
            src={URL.createObjectURL(thumbnailFile)}
            alt="Thumbnail preview"
            className="w-full object-cover rounded aspect-video mb-2"
          />
          <button
            type="button"
            onClick={() => setThumbnailFile(null)}
            className="w-full text-sm border px-2 py-1 rounded hover:bg-gray-100"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
