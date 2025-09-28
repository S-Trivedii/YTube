import {
  createCommentRepository,
  getAllCommentsByIdRepo,
} from "../repository/comment.repository.js";

export const createCommentService = async (commentData) => {
  return await createCommentRepository(commentData);
};

export const getAllCommentsByIdService = async (id) => {
  console.log("service");
  return await getAllCommentsByIdRepo(id);
};
