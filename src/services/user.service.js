const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");
const { detectError } = require("../utils/error");

const signUp = async (userInfo) => {
  const { name, email, password } = userInfo;
  const alreadyInUse = await userDao.findAcctByEmail(email);
  if (alreadyInUse) {
    detectError("The email is already in use", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userDao.signUp(name, email, hashedPassword);
};

const updatePassword = async (accountId, password, newPassword) => {
  const account = await userDao.findAcctById(accountId);
  const hashedPassword = account.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await userDao.updatePassword(accountId, newHashedPassword);
};

const deleteAccount = async (accountId, password) => {
  const account = await userDao.findAcctById(accountId);
  const hashedPassword = account.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  await userDao.deleteAccount(accountId);
};

module.exports = {
  signUp,
  updatePassword,
  deleteAccount,
};
