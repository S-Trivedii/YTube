import { useState, useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import axiosInstance from "../utils/axiosInstance";

const useInfiniteScroll = ({ limit = 10, endpoint }) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // useRef to prevent duplicate initial fetch (especially in React 18 dev mode)
  const hasFetched = useRef(false);

  const fetchData = async () => {
    // if you're already fetching don't fetch again || If you've already fetched 'all data', don't fetch more
    if (loading || (totalCount !== null && data.length >= totalCount)) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${endpoint}?offset=${offset}&limit=${limit}`
      );

      console.log("res.data - ", res.data.videos);
      setData((prev) => [...prev, ...res.data.videos]);

      setOffset((prev) => prev + limit);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  // throttle function insure that handleScroll handler only run after 500ms no matter how fast user scroll
  const handleScroll = throttle(() => {
    // Have we 'nearly' reached the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      fetchData();
    }
  }, 500);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData(); // initial load
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    data,
    loading,
    hasMore: totalCount === null || data.length < totalCount,
  };
};

export default useInfiniteScroll;
