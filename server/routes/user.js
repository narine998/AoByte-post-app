import express from "express";
import { authorizeUser } from "../middleware/authorize.js";
import { getUserPosts } from "../controllers/user.js";

const router = express.Router();

router.get("/users/:userId/posts", authorizeUser, getUserPosts);

export default router;
