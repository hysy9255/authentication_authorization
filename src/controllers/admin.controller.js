const adminService = require("../services/admin.service.js");
const { asyncWrap } = require("./../utils/error");

const showAccounts = asyncWrap(async (req, res) => {
  const users = await adminService.showAccounts();

  res.status(200).json(users);
});

const blockAccount = asyncWrap(async (req, res) => {
  const adminAcctId = res.locals.accountId;
  const requestData = req.body;

  const blocked = await adminService.blockAccount(adminAcctId, requestData);

  const message = blocked
    ? "Successfully blocked account"
    : "Successfully unblocked account";

  res.status(200).json({ message });
});

module.exports = {
  showAccounts,
  blockAccount,
};
