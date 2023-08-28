import jwt from "jsonwebtoken";

export const refreshAccessToken = (req, res, next, refreshToken) => {
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "invalid-refresh-token" });
      } else {
        const newAccessToken = jwt.sign(
          { userId: decoded.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "2m" }
        );
        res.cookie("accessToken", newAccessToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        console.log("Through refresh token");
        req.userId = decoded.userId;
        next();
      }
    }
  );
};
