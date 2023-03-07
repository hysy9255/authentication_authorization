const signInValidator = async (req, res, next) => {
  if (req.body.email === undefined || req.body.password === undefined) {
    const error = new Error("One or more of the required fields are missing");
    return next(error);
  }
  next();
};

module.exports = { signInValidator };
