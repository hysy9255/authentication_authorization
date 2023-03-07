const signUpValidator = async (req, res, next) => {
  if (
    req.body.name === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined
  ) {
    const error = new Error("One or more of the required fields are missing");
    return next(error);
  }

  const validEmail = req.body.email.split("").includes("@");
  if (!validEmail) {
    const error = new Error("It's an invalid email address");
    return next(error);
  }

  const validPassword = req.body.password.length > 5;
  if (!validPassword) {
    const error = new Error("It's an invalid password");
    return next(error);
  }

  next();
};

module.exports = { signUpValidator };
