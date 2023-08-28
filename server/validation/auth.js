import bcrypt from "bcrypt";

import User from "../models/user.js";
import { loginSchema, registerSchema } from "./schema.js";

export const validateSignUpForm = async (req, res, next) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      birthDate,
      gender,
    } = req.body;

    const userDoc = await User.findOne({ email });
    if (userDoc) {
      console.log("userDoc", userDoc);
      return res.status(400).json({
        errors: {
          email: "E-Mail exists already, please pick a different one.",
        },
      });
    }

    await registerSchema.validate(
      {
        name,
        surname,
        email,
        password,
        confirmPassword,
        birthDate,
        gender,
      },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      return res.json({ errors: validationErrors });
    }
    res.status(500).json({ message: "An error occurred." });
  }
};

export const validateLoginForm = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await loginSchema.validate(
      {
        email,
        password,
      },
      { abortEarly: false }
    );

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: { email: "Invalid email" } });
    }

    if (user.isVerified) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: { password: "Invalid password" } });
      }
      req.user = user;
      return next();
    } else {
      return res
        .status(400)
        .json({ errors: { email: "Please verify your email" } });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return res.status(400).json({ errors: validationErrors });
    }

    res.status(500).json({ error: err.message });
  }
};
