const adminService = require("../services/admin.service.js");

const showAccounts = async (req, res) => {
  const users = await adminService.showAccounts();
  res.status(200).json(users);
};

const blockAccount = async (req, res) => {
  const adminAcctId = res.locals.accountId;
  console.log(adminAcctId);
  const { userId, adminPassword } = req.body;
  await adminService.blockAccount(userId, adminAcctId, adminPassword);
  res.status(200).json({ message: "Successfully blocked account" });
};

module.exports = {
  showAccounts,
  blockAccount,
};
