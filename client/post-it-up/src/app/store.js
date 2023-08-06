import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "../features/loginModal/loginModalSlice";
import postsDataReducer from "../features/posts/postsSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    postsData: postsDataReducer,
    search: searchReducer,
  },
});
