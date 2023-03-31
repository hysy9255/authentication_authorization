const userDao = require("./../models/user.dao.js");

const getUserInfo = async (accountId) => {
  return await userDao.findAcctById(accountId);
};

module.exports = { getUserInfo };
