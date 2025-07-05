import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useFetchVideo = (id) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get(`/video/${id}`);
        setVideo(res.data.video);
      } catch (err) {
        console.error("Failed to load video", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  return { video, loading };
};

export default useFetchVideo;
