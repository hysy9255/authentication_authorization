const { detectError } = require("../utils/error.js");
const adminDao = require("./../models/admin.dao.js");
const bcrypt = require("bcrypt");
const { checkPassword } = require("./utils/service.error.js");

const showAccounts = async () => {
  return await adminDao.showAccounts();
};

const blockAccount = async (userId, adminAcctId, adminPassword) => {
  const admin = await adminDao.findAcctById(adminAcctId);
  await checkPassword(admin, adminPassword);

  await adminDao.blockAccount(userId);
};

module.exports = {
  showAccounts,
  blockAccount,
};
