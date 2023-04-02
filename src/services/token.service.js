const jwt = require("jsonwebtoken");
const tokenDao = require("../models/token.dao.js");
const error = require("./utils/service.error.js");

const signIn = async (accountInfo) => {
  const { email, password } = accountInfo;
  const account = await tokenDao.findAcctByEmail(email);

  error.checkIfAcctExist(account);
  error.checkIfAcctIsBlocked(account);
  await error.checkPassword(account, password);

  const payload = {
    accountId: account.id,
    isAdmin: account.isAdmin,
  };
  const token = jwt.sign(payload, process.env.SECRETE_KEY);
  return token;
};

module.exports = { signIn };
