import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.AUTH_EMAIL,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    refreshToken: process.env.AUTH_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email transporter verified");
  }
});

export const sendEmail = (email, token) => {
  return transporter.sendMail({
    to: email,
    from: process.env.AUTH_EMAIL,
    subject: "Verify Email",
    html: `
        <p>Click this <a href=${process.env.REACT_APP_BASE_URL}/verify-email?token=${token}>link</a> to verify your email</p>
      `,
  });
};

export const resendEmail = async (req, res, next) => {
  const oldToken = req.query.token;
  const { email } = jwt.decode(oldToken);
  const token = jwt.sign({ email }, process.env.VERIFY_TOKEN, {
    expiresIn: "1d",
  });

  try {
    await sendEmail(email, token);
    return res.status(200).json({ message: "Email resent" });
  } catch (err) {
    return res.status(401).json({ error: "Couldn't resend. Please try again" });
  }
};
