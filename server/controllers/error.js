export const get404 = (req, res, next) => {
  res.status(404).send({
    pageTitle: "Page Not Found",
    isAuthenticated: req.session.isLoggedIn,
  });
};
