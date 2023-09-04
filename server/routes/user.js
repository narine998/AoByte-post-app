import express from "express";

import { authorizeUser } from "../middleware/authorize.js";
import { getUserPosts, searchUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/users/:userId/posts", authorizeUser, getUserPosts);

router.get("/users/search", searchUsers);

export default router;
