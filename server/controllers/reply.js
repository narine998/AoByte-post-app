import Comment from "../models/comment.js";
import Reply from "../models/reply.js";
import Post from "../models/post.js";

export const fetchCommentReplies = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const replies = await Reply.find({ commentId }).populate(
      "author",
      "name surname"
    );
    return res.json({ replies });
  } catch (err) {
    return res.status(404).json({ error: "Error fetching replies" });
  }
};

export const replyComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;
    const { replyData } = req.body;

    if (!replyData.message) {
      return res.status(400).json({ error: "Reply can't be empty" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const reply = new Reply(replyData);
    await reply.save();

    return res.json({ message: "Reply added", reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReply = async (req, res) => {
  const { replyId } = req.params;
  console.log(replyId);
  try {
    await Reply.deleteOne({ _id: replyId });
    return res.json({ message: "Reply Deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
