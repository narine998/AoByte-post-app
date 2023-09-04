import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPost,
  deletePost,
  fetchPosts,
  update,
  updatePrivacy,
} from "./postsApi";

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
  async ({ postId, authorId }) => {
    try {
      const response = await deletePost({ postId, authorId });

      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const postsSlice = createSlice({
  name: "postsData",
  initialState,
  reducers: {},

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
      });
  },
});

export const selectPostsData = (state) => state.postsData;

export default postsSlice.reducer;
