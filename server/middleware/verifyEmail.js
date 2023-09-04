import jwt from "jsonwebtoken";

import EmailToken from "../models/emailToken.js";
import User from "../models/user.js";

export const verifyEmail = (req, res, next) => {
  const token = req.query.token;

  if (token !== "null") {
    jwt.verify(token, process.env.VERIFY_TOKEN, async (error, decoded) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          const decodedToken = jwt.decode(token);
          await EmailToken.deleteOne({ email: decodedToken.email });

          return res.status(401).json({ error: "expired" });
        }

        return res.status(401).json({ error: "invalid" });
      }
      const email = decoded.email;
      await EmailToken.deleteOne({ email: email });

      await User.updateOne({ email: email }, { $set: { isVerified: true } });

      return res.status(200).json({ message: "verified" });
    });
  }
};
