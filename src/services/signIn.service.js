const jwt = require("jsonwebtoken");
const commonDao = require("../models/signIn.dao.js");
const { signInServiceErrors } = require("./utils/service.error.js");

const signIn = async (accountInfo) => {
  const { email, password } = accountInfo;
  const account = await commonDao.findAcctByEmail(email);
  signInServiceErrors.checkIfAcctExists(account);
  signInServiceErrors.checkIfAcctIsBlocked(account);
  await signInServiceErrors.checkPassword(account, password);

  const payload = {
    accountId: account.id,
    isAdmin: account.isAdmin,
  };
  const token = jwt.sign(payload, process.env.SECRETE_KEY);
  return token;
};

module.exports = { signIn };
