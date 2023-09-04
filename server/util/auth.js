import jwt from "jsonwebtoken";

export const refreshAccessToken = (req, res, next, refreshToken) => {
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "invalid-user" });
      } else {
        const newAccessToken = jwt.sign(
          { userId: decoded.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );

        res.cookie("accessToken", newAccessToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });

        req.userId = decoded.userId;
        next();
      }
    }
  );
};
