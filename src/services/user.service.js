const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");
const { userServiceErrors } = require("./utils/service.error");

const signUp = async (userInfo) => {
  const { name, email, password } = userInfo;
  await userServiceErrors.checkEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userDao.signUp(name, email, hashedPassword);
};

const updatePassword = async (accountId, password, newPassword) => {
  await userServiceErrors.checkPassword(accountId, password);

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await userDao.updatePassword(accountId, newHashedPassword);
};

const deleteAccount = async (accountId, password) => {
  await userServiceErrors.checkPassword(accountId, password);

  await userDao.deleteAccount(accountId);
};

module.exports = {
  signUp,
  updatePassword,
  deleteAccount,
};
