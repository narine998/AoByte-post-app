import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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
import { postValidationSchema } from "../../validation";
import { updatePost } from "../../features/posts/postsSlice";
import { fetchPostsByUser } from "../../features/user/userSlice";

import styles from "./EditPost.module.scss";

export const EditPostModal = ({ authorId, post, onClose }) => {
  const initialFormData = {
    title: post.title,
    description: post.description,
    image: "",
    category: post.category,
  };

  const [serverErrors, setServerErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();

  const editPostForm = useFormik({
    initialValues: initialFormData,
    validationSchema: postValidationSchema,
    onSubmit: (values) => {
      setSaving(true);
      dispatch(updatePost({ postId: post._id, authorId, ...values })).then(
        (resp) => {
          if (resp.payload && resp.payload.errors) {
            setServerErrors(resp.payload.errors);
          } else {
            setSaving(false);
            onClose();
            dispatch(fetchPostsByUser(authorId));
          }
        }
      );
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
                (editPostForm.errors.title || serverErrors.title)}
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
                (editPostForm.errors.description || serverErrors.description)}
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
                (editPostForm.errors.category || serverErrors.category)}
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
                (editPostForm.errors.image || serverErrors.image)}
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
