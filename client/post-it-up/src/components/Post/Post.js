import React, { useState } from "react";
import { Button } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicIcon from "@mui/icons-material/Public";
import { useSelector } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Avatar } from "@mui/material";

import { selectUserInfo } from "../../features/user/userSlice";
import Layout from "../../UI/Layout";
import Comments from "../Comments/Comments";
import ButtonWrapper from "../../UI/ButtonWrapper";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import EditPost from "../EditPost/EditPost";

import { createFormattedDate } from "../../helpers";

import styles from "./Post.module.scss";

function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [briefText, setBriefText] = useState(true);

  const {
    name,
    surname,
    _id: author,
  } = post.authorId || { name: "", surname: "" };

  const { user } = useSelector(selectUserInfo);

  const showAllComments = () => {
    setShowComments((prevComments) => !prevComments);
  };

  const getFullDescription = () => {
    setBriefText((prev) => !prev);
  };

  const handleLikeClick = () => {};

  return (
    <Layout>
      <div className={styles.creator}>
        <h2>
          <span>
            <Avatar sx={{ color: "#334063" }} />
          </span>
          <span className={styles.userInfo}>
            <span>{`${name} ${surname}`}</span>
            <span>
              <span>{createFormattedDate(post.createdDate)}</span>
              {post.public ? <PublicIcon /> : <LockOpenIcon />}
            </span>
          </span>
        </h2>
        {/* {user && user._id === author && (
          <ButtonWrapper onClick={toggleDropdown}>
            <MoreHorizIcon />
          </ButtonWrapper>
        )} */}
      </div>
      {/* {user && user._id === author && isOpen && (
        <>
          <DropDownMenu
            userId={author}
            postId={post._id}
            editBtnHandler={handleModalOpen}
            onClose={closeDropDown}
          />
          {openEditModal && (
            <EditPost
              userId={author}
              post={post}
              handleModalClose={handleModalClose}
              handleDropdownClose={closeDropDown}
            />
          )}
        </>
      )} */}

      <span className={styles.title}>{post.title}</span>
      <p className={styles.description}>
        {briefText ? post.description.split(".")[0] + "..." : post.description}
        <span onClick={getFullDescription}>{briefText ? "more" : "less"} </span>
      </p>
      <div>
        <img className={styles.postImg} src={post.imageUrl} />
      </div>
      <div className={styles.actions}>
        <span>
          <Button onClick={handleLikeClick}>
            <span></span>
            <FavoriteIcon />
          </Button>
        </span>
        <span>
          <Button onClick={showAllComments}>
            <span>{post.comments.length || ""}</span>
            <ModeCommentIcon />
          </Button>
        </span>
      </div>
      <div>
        <hr />
      </div>
      <div className={styles.commentLikeCont}>
        <Button>
          <FavoriteIcon />
          Like
        </Button>
        <Button onClick={showAllComments}>
          <ModeCommentIcon />
          Comment
        </Button>
      </div>

      {showComments && (
        <Comments commentData={post.comments} postId={post.id} />
      )}
    </Layout>
  );
}

export default Post;
