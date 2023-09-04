import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rating: {
    type: Number,
    default: 1,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  public: Boolean,
});

export default mongoose.model("Post", postSchema);
