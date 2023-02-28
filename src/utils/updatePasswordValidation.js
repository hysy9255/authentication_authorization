const userDao = require("../models/user.dao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../env/.env" });

const updatePasswordValidator = async (req, res, next) => {
  const jsonWebToken = req.headers.authorization;
  const decodedJwt = jwt.verify(jsonWebToken, process.env.SECRETE_KEY);
  const email = decodedJwt.email;
  const password = req.body.password;

  const user = await userDao.retrive(email);
  const hashedPassword = user.password;

  const passwordMatches = await bcrypt.compare(password, hashedPassword);

  if (!passwordMatches) {
    const error = new Error("Wrong password passed in");
    return next(error);
  }
  next();
};

module.exports = { updatePasswordValidator };
