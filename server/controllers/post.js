import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { bucket } from "../service/googleStorage.js";

import { POSTS_PER_PAGE } from "../constants/index.js";

export const fetchPublicPosts = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const { author, category, title } = req.query;

  try {
    const filterConditions = { public: true };

    if (author) {
      filterConditions.author = author;
    }
    if (category) {
      filterConditions.category = category;
    }
    // if (fromDate && toDate) {
    //   filterConditions.createdAt = { $gte: fromDate, $lte: toDate };
    // }
    if (title) {
      filterConditions.title = new RegExp(title, "i");
    }

    const totalPosts = await Post.countDocuments(filterConditions);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    const skip = (currentPage - 1) * POSTS_PER_PAGE;

    const posts = await Post.find(filterConditions)
      .sort({ createdDate: -1 })
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .populate("authorId", "name surname");

    return res.json({ posts, currentPage, totalPages });
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
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
  console.log(file);

  if (file) {
    console.log(file);
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
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { ...updateData },
      {
        new: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ message: "Post updated!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  const comment = req.body;
  const { postId } = req.params;

  const newComment = new Comment(comment);
  await newComment.save();
  try {
    const post = await Post.findById({ postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push(newComment);
    await post.save();
    return res.json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await Post.deleteOne({ _id: postId });
    return res.json({ message: "Post deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addReply = (req, res, next) => {};

export const getComments = (req, res, next) => {};
