const { detectError } = require("../utils/error.js");
const adminDao = require("./../models/admin.dao.js");
const bcrypt = require("bcrypt");

const showAccounts = async () => {
  return await adminDao.showAccounts();
};

const blockAccount = async (userId, adminAcctId, adminPassword) => {
  const admin = await adminDao.findAcctById(adminAcctId);
  const hashedPassword = admin.password;
  const passwordMatches = await bcrypt.compare(adminPassword, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  await adminDao.blockAccount(userId);
};

module.exports = {
  showAccounts,
  blockAccount,
};
