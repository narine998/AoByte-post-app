import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  surname: Yup.string().required("Surname is required."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Please enter a password with only numbers and text."
    )
    .min(5, "Password must be at least 5 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm password is required."),
  birthDate: Yup.string()
    .required("Birth date is required.")
    .test("minimumAge", "User must be at least 8 years old.", (value) => {
      const currentDate = new Date();
      const userBirthDate = new Date(value);

      const userAgeInYears =
        currentDate.getFullYear() - userBirthDate.getFullYear();

      return userAgeInYears >= 8;
    }),
  gender: Yup.string().required("Gender is required."),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const postSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed()
    .test("fileFormat", "Unsupported file format", function (value) {
      if (!value) return true;
      const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
      return supportedFormats.includes(value.mimetype);
    })
    .test("fileSize", "File size is too large", function (value) {
      if (!value) return true;

      const maxSize = 10 * 1024 * 1024; // 5MB in bytes
      return value.size <= maxSize;
    }),
});
