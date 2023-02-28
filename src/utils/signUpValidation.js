const userDao = require("../models/user.dao");

const signUpValidator = async (req, res, next) => {
  const userInformation = req.body;
  if (
    userInformation.name === undefined ||
    userInformation.email === undefined ||
    userInformation.password === undefined
  ) {
    const error = new Error("One or more of the required fields are missing");
    return next(error);
  }

  const validEmail = userInformation.email.split("").includes("@");
  if (!validEmail) {
    const error = new Error("It's an invalid email address");
    return next(error);
  }

  const validPassword = userInformation.password.length > 5;
  if (!validPassword) {
    const error = new Error("It's an invalid password");
    return next(error);
  }

  const alreadyInUse = await userDao.retrive(userInformation.email);
  if (alreadyInUse) {
    const error = new Error("The email is already in use");
    return next(error);
  }
  next();
};

module.exports = { signUpValidator };
