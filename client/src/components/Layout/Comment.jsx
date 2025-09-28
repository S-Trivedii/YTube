import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [userAllComment, setUserAllComment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comment/${id}`);
        if (response.data.success) {
          console.log("get ", response.data);
          setUserAllComment(response.data.comments);
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const handlePostComment = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await axiosInstance.post("/comment", {
        comment,
        videoId: id,
      });

      if (response.data.success) {
        setUserAllComment((prev) => [...prev, response.data.userComment]);
      }
    } catch (error) {
      console.log("Error posting comment:", error);
    } finally {
      setComment("");
    }
  };

  // Log userAllComment every time it changes
  useEffect(() => {
    console.log("All Comments-:", userAllComment);
  }, [userAllComment]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* Input box with user logo */}
      <div className="flex items-start gap-3 mb-6">
        <FaUserCircle className="text-3xl text-gray-600 mt-1" />
        <div className="flex-1">
          <textarea
            rows="2"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePostComment}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Render posted comments */}
      <div className="flex flex-col gap-4">
        {userAllComment.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          userAllComment.map((cmt, index) => (
            <div key={index} className="flex items-center justify-center gap-3">
              {/* Show user avatar */}
              <img
                src={cmt.userId.avatar || "/defaultAvatar.png"} // fallback if no avatar
                alt={cmt.userId.username}
                className="w-8 h-8 rounded-full mt-1"
              />

              <div className="flex-1 bg-gray-100 p-3 rounded-md">
                {/* Show username */}
                <p className="font-semibold text-sm">{cmt.userId.username}</p>
                {/* Show comment */}
                <p className="text-sm">{cmt.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
