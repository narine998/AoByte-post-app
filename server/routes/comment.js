import express from "express";

import { authorizeUser } from "../middleware/authorize.js";
import { permitUser } from "../middleware/permitUser.js";
import {
  addComment,
  deleteComment,
  editComment,
  fetchPostComments,
  likeComment,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/posts/:postId/comments", fetchPostComments);

router.post("/posts/:postId/comments", authorizeUser, addComment);

router.delete(
  "/posts/:postId/comments/:commentId",
  authorizeUser,
  permitUser,
  deleteComment
);

router.put(
  "/posts/:postId/comments/:commentId",
  authorizeUser,
  permitUser,
  editComment
);

router.post(
  "/posts/:postId/comments/:commentId/likes",
  authorizeUser,
  likeComment
);

export default router;
