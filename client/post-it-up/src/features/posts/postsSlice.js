import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  fetchPosts,
  replyComment,
  update,
  updatePrivacy,
} from "./postsApi";
import { findAverageRate, sortObjectsByKey } from "../../helpers";

const initialState = {
  posts: [],
  totalPages: 1,
  loading: true,
  error: null,
};

export const loadPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (filters) => {
    try {
      const response = await fetchPosts(filters);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (postData) => {
    try {
      const response = await addPost(postData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        return err.response.data;
      } else {
        throw new Error("An error occurred during post creation.");
      }
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, ...rest }) => {
    try {
      const response = await update(postId, rest);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const updatePostPrivacy = createAsyncThunk(
  "posts/updatePrivacy",
  async ({ postId, ...privacy }) => {
    try {
      const response = await updatePrivacy(postId, privacy);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const deletePostInfo = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    try {
      const response = await deletePost(postId);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

// export const sendNewComment = createAsyncThunk(
//   "posts/addComment",
//   async (commentInfo) => {
//     try {
//       const { postId, newComment, direction } = commentInfo;
//       const response = await addComment(postId, newComment);
//       return { comment: response.data, postId, direction };
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const sendNewComment = createAsyncThunk(
  "posts/addComment",
  async (commentInfo) => {
    try {
      const { postId, newComment, direction } = commentInfo;
      const response = await addComment(postId, newComment);
      return { comment: response.data, postId, direction };
    } catch (error) {
      throw error;
    }
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
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
