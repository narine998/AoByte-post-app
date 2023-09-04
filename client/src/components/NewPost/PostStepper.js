import React from "react";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { POST_CATEGORIES } from "../../constants";

import styles from "./NewPost.module.scss";

export function PostStepper({ activeStep, form, serverErrors, isSubmitting }) {
  switch (activeStep) {
    case 0:
      return (
        <div className={styles.inputContainer}>
          <textarea
            value={form.values.title}
            placeholder="Write a title"
            name="title"
            required
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <div className={styles.errors}>
            {form.touched.title && (form.errors.title || serverErrors.title)}
          </div>
        </div>
      );
    case 1:
      return (
        <div className={styles.description}>
          <textarea
            value={form.values.description}
            placeholder="Write a description"
            name="description"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            required
          />
          <div className={styles.errors}>
            {form.touched.description &&
              (form.errors.description || serverErrors.description)}
          </div>
        </div>
      );
    case 2:
      return (
        <div className={styles.category}>
          <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Choose the category
                <hr />
              </FormLabel>
              <RadioGroup
                aria-label
                edby="demo-radio-buttons-group-label"
                name="category"
                defaultValue={form.values.category}
              >
                <div className={styles.radio}>
                  {POST_CATEGORIES.map((category) => (
                    <FormControlLabel
                      key={category}
                      value={category}
                      control={<Radio />}
                      label={category}
                      onChange={form.handleChange}
                    />
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.errors}>
            {form.touched.category &&
              (form.errors.category || serverErrors.category)}
          </div>
        </div>
      );
    case 3:
      return (
        <div className={styles.lastStep}>
          <div className={styles.upload}>
            <label htmlFor="fileInput">
              Upload an Image
              <AddPhotoAlternateIcon fontSize="large" />
              <input
                type="file"
                id="fileInput"
                name="image"
                onChange={(e) => {
                  form.setFieldValue("image", e.target.files[0]);
                }}
                onBlur={form.handleBlur}
              />
            </label>
            {form.values.image && <span>{form.values.image.name}</span>}
            <div className={styles.errors}>
              {form.touched.image && (form.errors.image || serverErrors.image)}
            </div>
            {form.values.image && (
              <div className={styles.imgContainer}>
                <img
                  src={URL.createObjectURL(form.values.image)}
                  alt={form.values.title}
                />
              </div>
            )}
          </div>
          <div className={styles.submitBtn}>
            <Button type="submit">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      );
  }
}
