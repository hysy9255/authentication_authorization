const adminService = require("../services/admin.service.js");

const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  res
    .status(200)
    .json({ message: "All users have been retrieved", users: users });
};

const blockAccount = async (req, res) => {
  const token = req.headers.authorization;
  const blockedUser = await adminService.blockAccount(
    token,
    req.body.emailToBlock,
    req.body.adminPassword
  );
  res.status(200).json({
    message: "Admin blocked the account",
    blockedUser: blockedUser,
  });
};

module.exports = {
  getAllUsers,
  blockAccount,
};
