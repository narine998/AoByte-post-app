import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import CreatePost from "./pages/CreatePost";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

import { isUserLogedIn } from "./features/user/userSlice";

import {
  HOME_PATH,
  SIGNUP_PATH,
  NEWPOST_PATH,
  VERIFY_EMAIL_PATH,
  PROFILE_PATH,
  USER_POSTS_PAGE,
} from "./constants";

import SinglePostPage from "./pages/SinglePostPage";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
  },
  {
    path: SIGNUP_PATH,
    element: <SignUpPage />,
  },
  {
    path: VERIFY_EMAIL_PATH,
    element: <VerifyEmailPage />,
  },
  {
    path: NEWPOST_PATH,
    element: <CreatePost />,
  },
  {
    path: PROFILE_PATH,
    element: <ProfilePage />,
  },
  {
    path: USER_POSTS_PAGE,
    element: <SinglePostPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLogedIn());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
