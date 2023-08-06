import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addPost,
  deleteComment,
  fetchPosts,
  replyComment,
} from "./postsApi";
import { findAverageRate, sortObjectsByKey } from "../../helpers";

const initialState = {
  posts: [],
  loading: true,
  error: null,
};

export const loadPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await fetchPosts();
    return findAverageRate(response.data);
  } catch (error) {
    throw error;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (postData) => {
    const response = await addPost(postData);
    return response.data;
  }
);

export const sendNewComment = createAsyncThunk(
  "posts/addComment",
  async (commentInfo) => {
    const { postId, commentData, direction, rate } = commentInfo;
    const response = await addComment(postId, {
      text: commentData,
      rating: rate,
    });
    return { comment: response.data, postId, direction };
  }
);

export const deletePostComment = createAsyncThunk(
  "posts/deleteComment",
  async (deleteCommentInfo) => {
    const { postId, commentId, direction } = deleteCommentInfo;
    await deleteComment(postId, commentId);
    return { postId, commentId, direction };
  }
);

export const replyPostComment = createAsyncThunk(
  "posts/replyComment",
  async (replyInfo) => {
    const { postId, commentId, replyText } = replyInfo;
    const response = await replyComment(postId, commentId, { text: replyText });
    return { reply: response.data, postId, commentId };
  }
);

export const postsSlice = createSlice({
  name: "postsData",
  initialState,
  reducers: {
    sortComments: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      post.comments = sortObjectsByKey(
        post.comments,
        "rating",
        action.payload.direction
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.id === action.payload.postId
        );
        post.comments.push(action.payload.comment);
        sortObjectsByKey(post.comments, "rating", action.payload.direction);
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.id === action.payload.postId
        );
        post.comments = post.comments.filter(
          (com) => com.id !== action.payload.commentId
        );
        sortObjectsByKey(post.comments, "rating", action.payload.direction);
      })
      .addCase(replyPostComment.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.id === action.payload.postId
        );
        const comment = post.comments.find(
          (com) => com.id === action.payload.commentId
        );
        comment.replies.push(action.payload.reply);
      });
  },
});

export const { sortComments, updateComments, updateCommentReplies } =
  postsSlice.actions;

export const selectPostsData = (state) => state.postsData;

export default postsSlice.reducer;
