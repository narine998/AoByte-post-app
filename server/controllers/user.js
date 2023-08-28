import Post from "../models/post.js";

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ authorId: userId }).populate(
      "authorId",
      "name surname"
    );
    return res.json({ posts });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
