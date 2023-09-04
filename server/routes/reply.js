import express from "express";

import { authorizeUser } from "../middleware/authorize.js";
import { permitUser } from "../middleware/permitUser.js";
import {
  deleteReply,
  fetchCommentReplies,
  replyComment,
} from "../controllers/reply.js";

const router = express.Router();

router.get("/posts/:postId/comments/:commentId/replies", fetchCommentReplies);

router.post(
  "/posts/:postId/comments/:commentId/replies",
  authorizeUser,
  replyComment
);

router.delete(
  "/posts/:postId/comments/:commentId/replies/:replyId",
  authorizeUser,
  permitUser,
  deleteReply
);

export default router;
