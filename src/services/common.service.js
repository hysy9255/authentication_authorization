const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const commonDao = require("../models/common.dao.js");
const { detectError } = require("../utils/error.js");

const signIn = async (userInfo) => {
  const { email, password } = userInfo;
  const user = await commonDao.findAcctByEmail(email);
  if (user === null) {
    detectError("Given email is not found in DB", 404);
  }
  if (user.isBlocked) {
    detectError("The given email is blocked", 400);
  }
  const hashedPassword = user.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  const payload = {
    userId: user.id,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.SECRETE_KEY);
  return token;
};

module.exports = { signIn };
