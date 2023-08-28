import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Comment", commentSchema);
