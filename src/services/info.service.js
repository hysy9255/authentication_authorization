const infoDao = require("../models/info.dao.js");

const getUserInfo = async (accountId) => {
  return await infoDao.findAcctById(accountId);
};

module.exports = { getUserInfo };
