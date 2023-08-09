import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { HOME_PATH } from "../../constants";

import styles from "./NewPost.module.scss";
import { addNewPost } from "../../features/posts/postsSlice";
import { useDispatch } from "react-redux";

function NewPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setMessage("");
    setIsSuccess(true);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    setMessage("");
    setIsSuccess(true);
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDescriptionError(false);

    if (title.trim() === "") {
      setTitleError(true);
    }
    if (description.trim() === "") {
      setDescriptionError(true);
    }

    if (title.trim() === "" || description.trim() === "") {
      setIsSuccess(false);
      setMessage("Please fill in all required fields");
      return;
    }

    const postData = {
      title,
      description,
      imageFile: image,
    };

    dispatch(addNewPost(postData))
      .then(() => {
        setIsSuccess(true);
        setMessage("Post successfully created");
      })
      .catch(() => {
        setIsSuccess(false);
        setMessage("Sorry! Something went wrong \u{1F614}");
      })
      .finally(() => {
        setTitle("");
        setDescription("");
        setImage("");
      });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <legend>Create a New Post</legend>
        <div>
          <textarea
            value={title}
            placeholder="Write a title"
            onChange={onTitleChange}
            className={titleError ? styles.inputError : ""}
          />
        </div>
        <div>
          <textarea
            value={description}
            placeholder="Write a description"
            onChange={onDescriptionChange}
            className={descriptionError ? styles.inputError : ""}
          />
        </div>
        <div className={styles.customFileInput}>
          <label htmlFor="fileInput">
            {!image ? " Choose an Image" : ""}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
          {image && <span>{image.name}</span>}
        </div>
        <div>
          <Button type="submit">Create Post</Button>
        </div>
        <div className={styles.successMessage}>
          <span className={isSuccess ? styles.success : styles.error}>
            {message}
          </span>
          <Link to={HOME_PATH}>&rarr; Home</Link>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
