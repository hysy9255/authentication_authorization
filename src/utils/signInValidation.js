const userDao = require("../models/user.dao");
const bcrypt = require("bcrypt");

const signInValidator = async (req, res, next) => {
  const userInformation = req.body;
  const email = userInformation.email;
  const password = userInformation.password;

  if (email === undefined || password === undefined) {
    const error = new Error("One or more of the required fields are missing");
    return next(error);
  }

  const user = await userDao.retrive(email);
  if (user === null) {
    const error = new Error("Given email is not found in DB");
    return next(error);
  }

  const hashedPassword = user.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    const error = new Error("Passed in wrong password");
    return next(error);
  }
  next();
};

module.exports = { signInValidator };
