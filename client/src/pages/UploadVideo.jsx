import { useState } from "react";
import VideoUploadSection from "../components/ui/VideoUploadSection";
import VideoDetailsForm from "../components/ui/VideoDetailsForm";
import ThumbnailUpload from "../components/ui/ThumbnailUpload";
import PrivacyToggle from "../components/ui/PrivacyToggle";
import PublishSection from "../components/ui/PublishSection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    category: "",
  });

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
    if (!videoFile || !videoDetails.title.trim()) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("video", videoFile);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    formData.append("videoTitle", videoDetails.title);
    formData.append("videoDescription", videoDetails.description);
    formData.append("videoCategory", videoDetails.category);
    formData.append("isPublic", isPublic);

    try {
      const response = await axiosInstance.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log("Video ", response.data);
      // Optionally, show success message or redirect
      if (response.data.success) {
        toast.success("Video uploaded successfully");
        navigate("/channel");
      } else {
        toast.error("Video upload failed");
      }
    } catch (error) {
      // Optionally, show error message
      console.error("Video upload failed:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // figure out the size of the file Bytes / KB / MB / GB
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
                videoDetails={videoDetails}
                setVideoDetails={setVideoDetails}
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
                title={videoDetails.title}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
