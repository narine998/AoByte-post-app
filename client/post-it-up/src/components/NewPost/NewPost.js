import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { addNewPost } from "../../features/posts/postsSlice";
import { selectUserInfo } from "../../features/user/userSlice";
import { postValidationSchema } from "../../validation";
import { POST_CATEGORIES } from "../../constants";

import styles from "./NewPost.module.scss";

// function NewPost(props) {
//   const initialFormData = {
//     title: "",
//     description: "",
//     image: "",
//     category: "",
//   };
//   const [formData, setFormData] = useState(initialFormData);

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { user, userLoading } = useSelector(selectUserInfo);

//   const dispatch = useDispatch();

//   const handleChange = async (event) => {
//     const { name, value, files } = event.target;

//     setFormData((prevFormData) => {
//       return {
//         ...prevFormData,
//         [name]: name === "image" ? files[0] : value,
//       };
//     });

//     try {
//       await postValidationSchema.validate(formData, { abortEarly: false });
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     } catch (validationErrors) {
//       const errorsMap = validationErrors.inner.reduce(
//         (acc, error) => ({
//           ...acc,
//           [error.path]: error.message,
//         }),
//         {}
//       );
//       setErrors(errorsMap);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await postValidationSchema.validate(formData, { abortEarly: false });
//       setErrors({});
//       dispatch(addNewPost(formData))
//         .then((resp) => {
//           if (resp.payload && resp.payload.errors) {
//             setErrors(resp.payload.errors);
//           } else {
//             setFormData({ initialFormData });
//             navigate(`/profile/${user._id}`);
//             alert("Post successfully created!");
//           }
//         })
//         .catch(() => {
//           setMessage("Sorry! Something went wrong \u{1F614}");
//         });
//     } catch (validationErrors) {
//       const errorsMap = validationErrors.inner.reduce(
//         (acc, error) => ({
//           ...acc,
//           [error.path]: error.message,
//         }),
//         {}
//       );
//       setErrors(errorsMap);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formContainer}>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <legend>Create a New Post</legend>
//           <div>
//             <textarea
//               value={formData.title}
//               placeholder="Write a title"
//               name="title"
//               onChange={handleChange}
//               onBlur={handleChange}
//               className={errors.title && styles.inputError}
//             />
//             <div className={styles.errors}>{errors.title || ""}</div>
//           </div>
//           <div>
//             <textarea
//               value={formData.description}
//               placeholder="Write a description"
//               name="description"
//               onChange={handleChange}
//               onBlur={handleChange}
//               className={errors.description && styles.inputError}
//             />
//             <div className={styles.errors}>{errors.description || ""}</div>
//           </div>
//           <div className={styles.category}>
//             <div>
//               <FormControl>
//                 <FormLabel id="demo-radio-buttons-group-label">
//                   Choose the category
//                 </FormLabel>
//                 <RadioGroup
//                   aria-label
//                   edby="demo-radio-buttons-group-label"
//                   name="category"
//                   defaultValue="General"
//                 >
//                   <div className={styles.radio}>
//                     {POST_CATEGORIES.map((category) => (
//                       <FormControlLabel
//                         key={category}
//                         value={category}
//                         control={<Radio />}
//                         label={category}
//                         onChange={handleChange}
//                       />
//                     ))}
//                   </div>
//                 </RadioGroup>
//               </FormControl>
//             </div>
//             <div className={styles.errors}>{errors.category || ""}</div>
//           </div>
//           <div className={styles.customFileInput}>
//             <label htmlFor="fileInput">
//               {!formData.image ? " Upload an Image" : ""}
//               <AddPhotoAlternateIcon fontSize="large" />

//               <input
//                 type="file"
//                 id="fileInput"
//                 accept="image/*"
//                 name="image"
//                 onChange={handleChange}
//                 onBlur={handleChange}
//                 className={errors.image && styles.inputError}
//               />
//             </label>
//             {formData.image && <span>{formData.image.name}</span>}
//             <div className={styles.errors}>{errors.image || ""}</div>
//           </div>

//           <div>
//             <Button type="submit">Create Post</Button>
//           </div>
//           <div className={styles.successMessage}>
//             <span className={errors.postError ? styles.errors : styles.success}>
//               {message}
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { PostStepper } from "./PostStepper";
import { useFormik } from "formik";

function NewPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useSelector(selectUserInfo);

  const maxSteps = 5;

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
