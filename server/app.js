import express from "express";
import bodyParser from "body-parser";
import MongoDBStoreFactory from "connect-mongodb-session";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import { v4 as uuidv4 } from "uuid";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
import cors from "cors";
// import MongoConnect from "./config/mongo.js";
import session from "express-session";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import { get404 } from "./controllers/error.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Upload directory path
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },
// });

const MongoDBStore = MongoDBStoreFactory(session); // Create the MongoDBStore class

const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URI,
  collection: "sessions",
});

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

// app.use(get404);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((result) => {
    app.listen(process.env.PORT);
    console.log(`server listening on ${process.env.PORT} port`);
  })
  .catch((err) => {
    console.log(err);
  });
