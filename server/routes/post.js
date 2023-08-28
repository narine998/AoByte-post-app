import express from "express";

import { authorizeUser } from "../middleware/authorize.js";
import {
  addComment,
  createPost,
  deletePost,
  fetchPublicPosts,
  updatePost,
} from "../controllers/post.js";
import { validatePost } from "../validation/post.js";
import { upload } from "../service/googleStorage.js";

const router = express.Router();

router.get("/posts", fetchPublicPosts);

router.put(
  "/posts/:postId",
  authorizeUser,
  upload.single("image"),
  validatePost,
  updatePost
);

router.post(
  "/posts",
  authorizeUser,
  upload.single("image"),
  validatePost,
  createPost
);

// router.delete("/posts/:postId", verifyToken, (req, res) => {
//   const { postId } = req.params;
//   console.log(postId);
//   return res.json({ message: "deleted" });
// });

router.post("/posts/:postId/comments", authorizeUser, addComment);

router.delete("/posts/:postId", authorizeUser, deletePost);

// router.delete("/posts/:postId/comments/:commentId", (req, res) => {
//   const { postId, commentId } = req.params;
//   return res.send("Comment deleted");
// });

// router.post("/posts/:postId/comments/:commentId", (req, res) => {
//   const { postId, commentId } = req.params;
//   const reply = req.body;
//   const newReply = {
//     ...reply,
//   };

//   res.send(newReply);
// });

export default router;
