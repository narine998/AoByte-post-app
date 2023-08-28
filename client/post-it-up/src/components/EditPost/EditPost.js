import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import BackDrop from "../../UI/BackDrop";

import { postValidationSchema } from "../../validation";
import { updatePost } from "../../features/posts/postsSlice";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { POST_CATEGORIES } from "../../constants";

import styles from "./EditPost.module.scss";
import { fetchPostsByUser } from "../../features/user/userSlice";
import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";
import { useFormik } from "formik";

const EditPostModal = ({ userId, post, onClose }) => {
  const initialFormData = {
    title: post.title,
    description: post.description,
    image: "",
    category: post.category,
  };

  const [serverErrors, setServerErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();

  const editPostForm = useFormik({
    initialValues: initialFormData,
    validationSchema: postValidationSchema,
    onSubmit: (values) => {
      setSaving(true);
      dispatch(updatePost({ postId: post._id, ...values })).then((resp) => {
        if (resp.payload && resp.payload.errors) {
          setServerErrors(resp.payload.errors);
        } else {
          setSaving(false);
          onClose();
          dispatch(fetchPostsByUser(userId));
        }
      });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form
          onSubmit={editPostForm.handleSubmit}
          encType="multipart/form-data"
        >
          <div className={styles.title}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Title"
              value={editPostForm.values.title}
              name="title"
              onChange={editPostForm.handleChange}
              onBlur={editPostForm.handleBlur}
            />
            <div className={styles.errors}>
              {editPostForm.touched.title &&
                (editPostForm.values.title || serverErrors.title)}
            </div>
          </div>
          <div className={styles.description}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Description"
              value={editPostForm.values.description}
              name="description"
              onChange={editPostForm.handleChange}
              onBlur={editPostForm.handleBlur}
              rows={12}
              multiline
            />
            <div className={styles.errors}>
              {editPostForm.touched.description &&
                (editPostForm.values.description || serverErrors.description)}
            </div>
          </div>
          <div className={styles.category}>
            <div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Choose the category
                </FormLabel>
                <RadioGroup
                  aria-label
                  edby="demo-radio-buttons-group-label"
                  name="category"
                  defaultValue={post.category}
                >
                  <div className={styles.radio}>
                    {POST_CATEGORIES.map((category) => (
                      <FormControlLabel
                        key={category}
                        value={category}
                        control={<Radio />}
                        label={category}
                        onChange={editPostForm.handleChange}
                      />
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className={styles.errors}>
              {editPostForm.touched.category &&
                (editPostForm.values.category || serverErrors.category)}
            </div>
          </div>
          <div className={styles.upload}>
            <label htmlFor="fileInput">
              Upload an Image
              <AddPhotoAlternateIcon fontSize="large" />
              <input
                type="file"
                id="fileInput"
                name="image"
                onChange={(e) => {
                  editPostForm.setFieldValue("image", e.target.files[0]);
                }}
                onBlur={editPostForm.handleBlur}
              />
            </label>
            <div className={styles.errors}>
              {editPostForm.touched.image &&
                (editPostForm.values.image || serverErrors.image)}
            </div>
            <div>
              <img
                src={
                  editPostForm.values.image
                    ? URL.createObjectURL(editPostForm.values.image)
                    : post.imageUrl
                }
                alt={post.title}
              />
            </div>
          </div>

          <div className={styles.submitBtn}>
            <Button type="submit">{saving ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function EditPost({ userId, post, handleModalClose, handleDropdownClose }) {
  useDisableBodyScroll(true);
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={handleModalClose} />,
        document.getElementById("backdrop-container")
      )}
      {ReactDOM.createPortal(
        <EditPostModal
          userId={userId}
          post={post}
          onClose={handleModalClose}
        />,
        document.getElementById("modal-container")
      )}
    </>
  );
}

export default EditPost;
