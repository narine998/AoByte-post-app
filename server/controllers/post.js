import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

import { bucket } from "../service/googleStorage.js";
import { POSTS_PER_PAGE } from "../constants/index.js";
import { buildAggregatePipeline, computeDateFilters } from "../util/index.js";

export const fetchPublicPosts = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const { author, categories, date, order, title } = req.query;

  try {
    const filterConditions = { public: true };

    if (author) {
      const [name, surname] = author.split(" ");
      const matchingAuthors = await User.find({
        $and: [
          { name: { $regex: name, $options: "i" } },
          { surname: { $regex: surname, $options: "i" } },
        ],
      }).distinct("_id");
      filterConditions.authorId = { $in: matchingAuthors };
    }

    if (title) {
      const regex = new RegExp(title, "i");
      filterConditions.title = regex;
    }

    if (categories) {
      const categoryArr = categories.split(",");
      filterConditions.category = { $in: categoryArr };
    }

    if (date) {
      const dateFilters = computeDateFilters();
      if (date in dateFilters) {
        filterConditions.createdDate = dateFilters[date];
      }
    }

    const totalPosts = await Post.countDocuments(filterConditions);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const skip = (currentPage - 1) * POSTS_PER_PAGE;

    const pipeline = buildAggregatePipeline(filterConditions, order, skip);
    const posts = await Post.aggregate(pipeline).exec();

    return res.json({ posts, currentPage, totalPages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  const { title, description, category } = req.body;
  const file = req.file;
  let imageUrl = "";

  if (file) {
    const fileRef = bucket.file(`images/${file.originalname}`);

    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        cacheControl: "public, max-age=31536000",
      },
    });

    imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
  }

  const postData = {
    title,
    description,
    comments: [],
    public: false,
    authorId: req.userId,
    category,
    imageUrl,
  };

  const post = new Post(postData);
  await post.save();
  return res.json({ message: "Post created" });
};

export const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  let updateData = req.body;
  const file = req.file;

  if (file) {
    const fileRef = bucket.file(`images/${file.originalname}`);

    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        cacheControl: "public, max-age=31536000",
      },
    });

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
    updateData.imageUrl = imageUrl;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ message: "Post updated!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await Post.deleteOne({ _id: postId });
    await Comment.deleteMany({ postId });
    return res.json({ message: "Post deleted with its comments" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      await post.save();

      return res
        .status(200)
        .json({ message: "Post disliked successfully", likes: post.likes });
    }

    post.likes.push(userId);
    await post.save();

    return res
      .status(200)
      .json({ message: "Post liked successfully", likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userIds = post.likes;

    const users = await User.find({ _id: { $in: userIds } }, "name surname");

    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { title } = req.body;
    const regex = new RegExp(title, "i");

    const posts = await Post.find({ title: regex, public: true });

    return res.json({ posts });
  } catch (err) {
    return res.json({ posts: [] });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.query;

    const post = await Post.findById(postId).populate(
      "authorId",
      "name surname"
    );

    if (!post.public && post.authorId._id.toString() !== userId) {
      return res.json({ post: null, message: "Not permitted" });
    }

    return res.json({ post });
  } catch (err) {
    res.json({ post: null });
  }
};
