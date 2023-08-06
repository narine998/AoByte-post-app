import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUpPage, { action as authAction } from "./pages/SignUpPage";

import { HOME_PATH, SIGNUP_PATH, NEWPOST_PATH } from "./constants";

import PublishPost from "./pages/PublishPost";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
  },
  {
    path: SIGNUP_PATH,
    element: <SignUpPage />,
    action: authAction,
  },
  {
    path: NEWPOST_PATH,
    element: <PublishPost />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
