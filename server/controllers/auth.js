import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import EmailToken from "../models/emailToken.js";

import { sendEmail } from "../service/emailService.js";

export const registerUser = async (req, res, next) => {
  const { name, surname, email, password, birthDate, gender } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      isVerified: false,
      birthDate,
      gender,
    });

    await user.save();

    const token = jwt.sign({ email }, process.env.VERIFY_TOKEN, {
      expiresIn: "1m",
    });

    const verifyUser = new EmailToken({
      email,
      token,
    });

    await verifyUser.save();
    sendEmail(email, token).then(() => {
      console.log("email send");
      res.json({ message: "User registered", emailSend: true });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res, next) => {
  const accessToken = jwt.sign(
    { userId: req.user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2m",
    }
  );

  const refreshToken = jwt.sign(
    { userId: req.user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "50m",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // maxAge: 7 * 24 * 60 * 60 * 1000,
    maxAge: 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ user: req.user });
};

export const logOutUser = async (req, res, next) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.json({ message: "Loged out" });
};

export const getUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });
  res.json({ user });
};
