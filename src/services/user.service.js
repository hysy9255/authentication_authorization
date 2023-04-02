const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");
const error = require("./utils/service.error");

const createAccount = async (userInfo) => {
  const { name, email, password } = userInfo;
  await error.checkEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userDao.createAccount(name, email, hashedPassword);
};

const updatePassword = async (accountId, password, newPassword) => {
  const account = await userDao.findAcctById(accountId);
  await error.checkPassword(account, password);

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await userDao.updatePassword(accountId, newHashedPassword);
};

const deleteAccount = async (accountId, password) => {
  await error.checkPassword(accountId, password);

  await userDao.deleteAccount(accountId);
};

module.exports = {
  createAccount,
  updatePassword,
  deleteAccount,
};
