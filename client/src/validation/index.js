import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  name: Yup.string().required("First Name is required"),
  surname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Password must be alphanumeric")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  birthDate: Yup.date()
    .test("minimumAge", "You must be at least 8 years old.", (value) => {
      const currentDate = new Date();
      const userBirthDate = new Date(value);

      const userAgeInYears =
        currentDate.getFullYear() - userBirthDate.getFullYear();

      return userAgeInYears >= 8;
    })
    .required("Birth Date is required"),
  gender: Yup.string().required("Gender is required."),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Password must be alphanumeric")
    .required("Password is required"),
});

export const postValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed()
    .test("fileFormat", "Unsupported file format", function (value) {
      if (!value) return true;
      const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
      return supportedFormats.includes(value.type);
    })
    .test("fileSize", "File size is too large", function (value) {
      if (!value) return true;

      const maxSize = 10 * 1024 * 1024; // 5MB in bytes
      return value.size <= maxSize;
    }),
});
