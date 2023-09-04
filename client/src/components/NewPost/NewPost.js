import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { PostStepper } from "./PostStepper";
import { useFormik } from "formik";
import { Button } from "@mui/material";

import { addNewPost } from "../../features/posts/postsSlice";
import { selectUserInfo } from "../../features/user/userSlice";
import { postValidationSchema } from "../../validation";

import styles from "./NewPost.module.scss";

function NewPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useSelector(selectUserInfo);

  const maxSteps = 4;

  const initialFormData = {
    title: "",
    description: "",
    image: "",
    category: "General",
  };

  const createPostForm = useFormik({
    initialValues: initialFormData,
    validationSchema: postValidationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      dispatch(addNewPost(values)).then((resp) => {
        if (resp.payload && resp.payload.errors) {
          setServerErrors(resp.payload.errors);
        } else {
          navigate(`/profile/${user._id}`);
          alert("Post successfully created!");
        }
        setIsSubmitting(false);
      });
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form
          onSubmit={createPostForm.handleSubmit}
          encType="multipart/form-data"
        >
          <legend>Create a New Post</legend>
          <Box sx={{ width: "100%", flexGrow: 1 }}>
            <Box sx={{ width: "100%", p: 2 }}>
              <PostStepper
                activeStep={activeStep}
                form={createPostForm}
                serverErrors={serverErrors}
                isSubmitting={isSubmitting}
              />
            </Box>
            <MobileStepper
              className={styles.next}
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
