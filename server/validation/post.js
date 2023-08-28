import { postSchema } from "./schema.js";

export const validatePost = async (req, res, next) => {
  if ("public" in req.body) {
    return next();
  }
  const { title, description, category } = req.body;
  const image = req.file;

  try {
    await postSchema.validate(
      { title, description, category, image },
      { abortEarly: false }
    );
    next();
  } catch (err) {
    if (err.name === "ValidationError") {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return res.status(400).json({ errors: validationErrors });
    }

    return res.status(500).json({ error: err.message });
  }
};
