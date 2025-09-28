import {
  createCommentService,
  getAllCommentsByIdService,
} from "../services/comment.service.js";
import openai from "../utils/openai.js";

export const createCommentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { comment, videoId } = req.body;
    /*

    I am disabling this openai api for the time being
    // 1. Check moderation
    const moderationResponse = await openai.moderations.create({
      model: "omni-moderation-latest", // current recommended moderation model
      input: comment,
    });

    const results = moderationResponse.results[0];

    // console.log("Openai results: ", results); // check below how results will look like

    if (results.flagged) {
      return res.status(400).json({
        success: false,
        message: "Your comment was flagged as abusive or racist.",
      });
    }

    */

    // 2. Save comment to DB if safe
    const userComment = await createCommentService({
      userId,
      comment,
      videoId,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      userComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Comment creation failed",
      error: error.message,
      success: false,
    });
  }
};

export const getAllCommentByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("params ", id);

    const comments = await getAllCommentsByIdService(id);

    return res.status(200).json({
      success: true,
      comments,
      message: "Fetching all comments successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Comment fetching failed",
      error: error.message,
      success: false,
    });
  }
};

/*
Example response from moderation api

{
  "results": [
    {
      "categories": {
        "sexual": false,
        "hate": true,
        "harassment": true,
        "self_harm": false
      },
      "flagged": true
    }
  ]
}

You only need results[0].flagged. If true → reject comment
*/
