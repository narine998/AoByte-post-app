import Post from "../models/post.js";
import Comment from "../models/comment.js";
import Reply from "../models/reply.js";

export const fetchPostComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate(
      "author",
      "name surname"
    );
    return res.json({ comments });
  } catch (err) {
    return res.status(404).json({ error: "Error fetching comments" });
  }
};

export const addComment = async (req, res) => {
  const comment = req.body;
  const { postId } = req.params;

  if (!comment.message) {
    return res.status(400).json({ error: "Comment can't be empty" });
  }

  const newComment = new Comment(comment);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await newComment.save();

    return res.json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    await Comment.deleteOne({ _id: commentId });
    await Reply.deleteMany({ commentId });
    return res.json({ message: "Comment Deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  if (!comment.message) {
    return res.status(400).json({ error: "Comment can't be empty" });
  }

  try {
    const updateComment = await Comment.findByIdAndUpdate(commentId, comment, {
      new: true,
    });

    if (!updateComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.json({ message: "Comment updated!", comment: updateComment });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
      await comment.save();

      return res
        .status(200)
        .json({ message: "Post disliked successfully", likes: comment.likes });
    }

    comment.likes.push(userId);
    await comment.save();

    return res
      .status(200)
      .json({ message: "Post liked successfully", likes: comment.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
