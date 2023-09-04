import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import replyRouter from "./routes/reply.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Change to your frontend's origin
    credentials: true,
  })
);
app.use(cookieParser());

app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(replyRouter);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`server listening on ${process.env.PORT} port`);
  })
  .catch((err) => {
    console.log(err.message);
  });
