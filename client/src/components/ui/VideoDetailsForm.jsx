const VideoDetailsForm = ({ videoDetails, setVideoDetails }) => {
  return (
    <div className="border rounded-lg bg-white p-4 shadow space-y-4">
      <div>
        <label className="block font-medium mb-1">Title *</label>
        <input
          type="text"
          value={videoDetails.title}
          onChange={(e) =>
            setVideoDetails({ ...videoDetails, title: e.target.value })
          }
          required
          placeholder="Video title"
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          rows={4}
          value={videoDetails.description}
          onChange={(e) =>
            setVideoDetails({ ...videoDetails, description: e.target.value })
          }
          placeholder="Describe your video..."
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          value={videoDetails.category}
          onChange={(e) =>
            setVideoDetails({ ...videoDetails, category: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option value="">Select a category</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="gaming">Gaming</option>
          <option value="music">Music</option>
          <option value="news">News</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="travel">Travel</option>
          <option value="others">Others</option>
        </select>
      </div>
    </div>
  );
};

export default VideoDetailsForm;
