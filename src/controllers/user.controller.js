const userService = require("../services/user.service.js");
const { createUserPage, deleteUserPage } = require("../utils/superagent.js");
const { asyncWrap } = require("./../utils/error.js");
const error = require("./utils/controller.error.js");

const createAccount = asyncWrap(async (req, res) => {
  const userInfo = req.body;

  error.checkInputValues(userInfo);
  error.checkEmail(userInfo.email);
  error.checkPassword(userInfo.password);

  const account = await userService.createAccount(userInfo);
  await createUserPage(account);

  res.status(201).json({
    message: "User has been created!",
  });
});

const updatePassword = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const { password, newPassword } = req.body;

  await userService.updatePassword(accountId, password, newPassword);

  res.status(200).json({
    message: "Successfully updated the password!",
  });
});

const deleteAccount = asyncWrap(async (req, res) => {
  const accountId = res.locals.accountId;
  const password = req.body.password;

  await userService.deleteAccount(accountId, password);
  await deleteUserPage(accountId);

  res.status(200).json({ message: "Successfully deleted the account" });
});

module.exports = {
  createAccount,
  updatePassword,
  deleteAccount,
};
