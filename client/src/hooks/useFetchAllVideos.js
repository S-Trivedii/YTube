import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setAllVideos } from "../redux/videoSlice";

const useFetchAllVideos = () => {
  const dispatch = useDispatch();
  const allVideos = useSelector((state) => state.videos.allVideos);

  // Run useEffect only when allVideos is empty or no allVideos
  useEffect(() => {
    if (!allVideos || allVideos.length === 0) {
      const fetchAll = async () => {
        try {
          const res = await axiosInstance.get("/channel/videos");
          dispatch(setAllVideos(res.data.videos));
        } catch (err) {
          console.error("Failed to fetch all videos", err);
        }
      };

      fetchAll();
    }
  }, [allVideos, dispatch]);

  return allVideos;
};

export default useFetchAllVideos;
