import Post from "../models/post.js";
import User from "../models/user.js";

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ authorId: userId })
      .populate("authorId", "name surname")
      .sort({ createdDate: -1 });

    return res.json({ posts });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    const matchingAuthors = await User.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { surname: { $regex: searchTerm, $options: "i" } },
          ],
        },
      },
      {
        $group: {
          _id: { _id: "$_id", name: "$name", surname: "$surname" },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          name: "$_id.name",
          surname: "$_id.surname",
        },
      },
    ]).limit(8);

    return res.json({ authors: matchingAuthors });
  } catch (err) {
    return res.json({ error: err, authors: [] });
  }
};
