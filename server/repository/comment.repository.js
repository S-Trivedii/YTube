import { Comment } from "../schema/comment.model.js";
import { Video } from "../schema/video.model.js";

export const createCommentRepository = async ({ userId, comment, videoId }) => {
  const userComment = await Comment.create({
    userId,
    comment,
    videoId,
  });

  await Video.findByIdAndUpdate(videoId, {
    $push: { comments: userComment._id },
    // You can also use '$addToSet' instead of '$push'. If the same comment id is going to be pushed addToSet prevent that. In our case push is perfectly fine since each comment has unique id
  });

  return userComment;
};

export const getAllCommentsByIdRepo = async (id) => {
  console.log("first");

  const video = await Video.findById(id).populate({
    path: "comments",
    select: "comment userId createdAt",
    populate: {
      path: "userId",
      select: "username avatar",
    },
  });
  console.log("allcoments--:- ", video);
  return video.comments;
};

/*
Imagine this is a video document.
// Video document
{
  _id: "vid123",
  videoName: "Learn JS",
  comments: ["cmt001", "cmt002"]
}


.populate({ path: "comments", select: "comment" })

path: "comments" → tells Mongoose: "Look at the 'comments' field and fetch the full Comment documents these IDs refer to."
select: "comment" → tells Mongoose: "Only include the 'comment' field (and _id by default) from each Comment document."
*/
