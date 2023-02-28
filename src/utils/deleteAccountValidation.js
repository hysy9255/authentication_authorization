const jwt = require("jsonwebtoken");
const userDao = require("../models/user.dao");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../../env/.env" });

const deleteAccountValidator = async (req, res, next) => {
  const jsonWebToken = req.headers.authorization;
  const decodedJwt = jwt.verify(jsonWebToken, process.env.SECRETE_KEY);
  const email = decodedJwt.email;
  const password = req.body.password;

  const user = await userDao.retrive(email);
  const hashedPassword = user.password;

  // Don't get rid of await here. It is necessary.
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    const error = new Error(
      "The password passed in to verify the user is incorrect"
    );
    return next(error);
  }
  next();
};

module.exports = { deleteAccountValidator };
