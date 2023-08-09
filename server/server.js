import express from "express";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Upload directory path
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/posts", (req, res) => {
  fs.promises.readFile(path.resolve("posts.json"), "utf8").then((data) => {
    res.send(data);
  });
});

app.post("/api/posts", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const post = {
    id: uuidv4(),
    title,
    description,
    comments: [],
    created: new Date(),
  };
  res.send(post);
});

app.post("/api/posts/:postId/comments", (req, res) => {
  const comment = req.body;
  const { postId } = req.params;
  const newComment = {
    ...comment,
    id: uuidv4(),
    replies: [],
    likes: 0,
  };
  res.send(newComment);
});

app.delete("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  return res.send("Comment deleted");
});

app.post("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const reply = req.body;
  const newReply = {
    ...reply,
    id: uuidv4(),
  };
  res.send(newReply);
});

app.listen(process.env.PORT);
