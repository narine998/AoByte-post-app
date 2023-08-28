import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "../features/loginModal/loginModalSlice";
import postsDataReducer from "../features/posts/postsSlice";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    postsData: postsDataReducer,
    search: searchReducer,
    userInfo: userReducer,
  },
});
