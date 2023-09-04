import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../util/auth.js";

export const authorizeUser = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ error: "invalid-user" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error && error.name === "TokenExpiredError") {
      if (refreshToken) {
        refreshAccessToken(req, res, next, refreshToken);
      } else {
        return res.status(401).json({ error: "refresh" });
      }
    } else if (error) {
      return res.status(401).json({ error: "invalid-user" });
    } else {
      req.userId = decoded.userId;

      return next();
    }
  });
};
