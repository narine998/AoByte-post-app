import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchSinglePost } from "../features/posts/postsApi";

import { selectUserInfo } from "../features/user/userSlice";
import { HOME_PATH } from "../constants";
import { SinglePost } from "../components";

function SinglePostPage(props) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector(selectUserInfo);

  useEffect(() => {
    fetchSinglePost({ postId, userId: user?._id }).then((resp) => {
      if (resp.message === "Not permitted") {
        navigate(HOME_PATH);
        return;
      }
      setPost(resp.post);
    });
  }, [postId, user]);

  return post && <SinglePost post={post} />;
}

export default SinglePostPage;
