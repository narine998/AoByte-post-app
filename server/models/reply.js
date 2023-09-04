import mongoose from "mongoose";

const Schema = mongoose.Schema;

const replySchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

export default mongoose.model("Reply", replySchema);
