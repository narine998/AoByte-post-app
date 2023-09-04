export const permitUser = (req, res, next) => {
  const { authorId } = req.body;

  if (authorId === req.userId) {
    return next();
  } else {
    return res.status(401).json({ message: "Action not permitted!" });
  }
};
