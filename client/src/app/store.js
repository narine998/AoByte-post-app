import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "../features/loginModal/loginModalSlice";
import postsDataReducer from "../features/posts/postsSlice";
import filterSearchReducer from "../features/filters/filterSearchSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    postsData: postsDataReducer,
    filters: filterSearchReducer,
    userInfo: userReducer,
  },
});
