import express from "express";

import { authorizeUser } from "../middleware/authorize.js";
import {
  createPost,
  deletePost,
  fetchPublicPosts,
  getPostLikes,
  getSinglePost,
  likePost,
  ratePost,
  searchPosts,
  updatePost,
} from "../controllers/post.js";
import { validatePost } from "../validation/post.js";
import { upload } from "../service/googleStorage.js";
import { permitUser } from "../middleware/permitUser.js";

const router = express.Router();

router.get("/posts", fetchPublicPosts);

router.post(
  "/posts",
  authorizeUser,
  upload.single("image"),
  validatePost,
  createPost
);

router.put(
  "/posts/:postId",
  authorizeUser,
  upload.single("image"),
  permitUser,
  validatePost,
  updatePost
);

router.delete("/posts/:postId", authorizeUser, permitUser, deletePost);

router.get("/posts/:postId/likes", getPostLikes);

router.post("/posts/:postId/likes", authorizeUser, likePost);

router.post("/posts/:postId/rating", authorizeUser, ratePost);

router.post("/posts/search", searchPosts);

router.get("/posts/:postId", getSinglePost);

export default router;
