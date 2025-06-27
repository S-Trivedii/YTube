import { useState } from "react";
import VideoUploadSection from "../components/ui/VideoUploadSection";
import VideoDetailsForm from "../components/ui/VideoDetailsForm";
import ThumbnailUpload from "../components/ui/ThumbnailUpload";
import PrivacyToggle from "../components/ui/PrivacyToggle";
import PublishSection from "../components/ui/PublishSection";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !title.trim()) return;

    setIsUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    console.log("Uploading video:", {
      videoFile,
      thumbnailFile,
      title,
      description,
      category,
      isPublic,
    });

    setIsUploading(false);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
        <p className="text-gray-600 mb-6">Share your content with the world</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VideoUploadSection
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                handleVideoUpload={handleVideoUpload}
                formatFileSize={formatFileSize}
              />
              <VideoDetailsForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className="space-y-6">
              <ThumbnailUpload
                thumbnailFile={thumbnailFile}
                setThumbnailFile={setThumbnailFile}
                handleThumbnailUpload={handleThumbnailUpload}
              />
              <PrivacyToggle isPublic={isPublic} setIsPublic={setIsPublic} />
              <PublishSection
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                videoFile={videoFile}
                title={title}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
