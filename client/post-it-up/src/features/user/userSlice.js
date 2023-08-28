import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkUser,
  fetchUserPosts,
  logOut,
  login,
  reSendEmail,
  register,
  verifyEmail,
} from "./userApi";

const initialState = {
  user: null,
  userLoading: true,
  isVerified: false,
  resendEmail: false,
  isEmailResent: false,
  verifyError: false,
};

export const isUserLogedIn = createAsyncThunk("user/checkUser", async () => {
  try {
    const response = await checkUser();
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  try {
    const response = await login(userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      return err.response.data;
    } else {
      throw new Error("An error occurred during login.");
    }
  }
});

export const logOutUser = createAsyncThunk("user/logOut", async () => {
  try {
    const response = await logOut();
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const response = await register(userData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        return err.response.data;
      } else {
        throw new Error(err.message);
      }
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  "user/verify",
  async (token) => {
    try {
      const response = await verifyEmail(token);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
);

export const sendEmail = createAsyncThunk("user/resend", async (token) => {
  try {
    const response = await reSendEmail(token);
    return response.data;
  } catch (err) {
    return { message: err.message };
  }
});

export const fetchPostsByUser = createAsyncThunk(
  "user/fetchPosts",
  async (userId) => {
    try {
      const response = await fetchUserPosts(userId);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user posts.");
    }
  }
);

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isUserLogedIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userLoading = false;
      })
      .addCase(isUserLogedIn.rejected, (state, action) => {
        state.user = null;
        state.userLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (!action.payload.errors) state.user = action.payload.user;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(verifyUserEmail.fulfilled, (state, action) => {
        state.isVerified = action.payload.message === "verified";
      })
      .addCase(verifyUserEmail.rejected, (state, action) => {
        state.resendEmail = action.error.message === "expired";
        state.verifyError = action.error.message === "invalid";
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isEmailResent = action.payload.message === "Email resent";
        state.resendEmail = !state.isEmailResent;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.user.posts = action.payload.posts;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.user.posts = [];
      });
  },
});

export const selectUserInfo = (state) => state.userInfo;

export default userSlice.reducer;
