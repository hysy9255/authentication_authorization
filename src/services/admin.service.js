const adminDao = require("./../models/admin.dao.js");
const { checkPassword } = require("./utils/service.error.js");

const showAccounts = async () => {
  return await adminDao.showAccounts();
};

const blockAccount = async (adminAcctId, requestData) => {
  const { userId, adminPassword } = requestData;

  const admin = await adminDao.findAcctById(adminAcctId);
  await checkPassword(admin, adminPassword);

  const user = await adminDao.blockAccount(userId);
  return user.isBlocked;
};

module.exports = {
  showAccounts,
  blockAccount,
};
