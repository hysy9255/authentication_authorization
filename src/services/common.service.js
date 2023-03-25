const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const commonDao = require("../models/common.dao.js");
const { detectError } = require("../utils/error.js");

const signIn = async (accountInfo) => {
  const { email, password } = accountInfo;
  const account = await commonDao.findAcctByEmail(email);
  if (account === null) {
    detectError("Given email is not found in DB", 404);
  }
  if (account.isBlocked) {
    detectError("The given email is blocked", 400);
  }
  const hashedPassword = account.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  const payload = {
    accountId: account.id,
    isAdmin: account.isAdmin,
  };
  const token = jwt.sign(payload, process.env.SECRETE_KEY);
  return token;
};

module.exports = { signIn };
