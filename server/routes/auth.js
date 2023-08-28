import express from "express";

import {
  getUser,
  logOutUser,
  loginUser,
  registerUser,
} from "../controllers/auth.js";
import { validateLoginForm, validateSignUpForm } from "../validation/auth.js";
import { verifyEmail } from "../middleware/verifyEmail.js";
import { resendEmail } from "../service/emailService.js";
import { authorizeUser } from "../middleware/authorize.js";

const router = express.Router();

router.post("/register", validateSignUpForm, registerUser);

router.post("/login", validateLoginForm, loginUser);

router.post("/logout", logOutUser);

router.get("/verify-email", verifyEmail);

router.get("/resend-email", resendEmail);

router.get("/is-user-loged-in", authorizeUser, getUser);

export default router;
