const userService = require("../services/user.service.js");
const superagent = require("superagent");
const { createUserPage, deleteUserPage } = require("../utils/superagent.js");
const { userControllerErrors } = require("./utils/controller.error.js");

const signUp = async (req, res) => {
  const userInfo = req.body;
  userControllerErrors.checkInputValues(userInfo);
  userControllerErrors.checkEmail(userInfo.email);
  userControllerErrors.checkPassword(userInfo.password);

  const account = await userService.signUp(userInfo);
  const response = await createUserPage(account);
  if (response.body.message === "User page has been created") {
    res.status(201).json({ message: "User has been created!" });
  }
};

const updatePassword = async (req, res) => {
  const accountId = res.locals.accountId;
  const { password, newPassword } = req.body;
  await userService.updatePassword(accountId, password, newPassword);
  res.status(200).json({
    message: "Successfully updated the password!",
  });
};

const deleteAccount = async (req, res) => {
  const accountId = res.locals.accountId;
  const password = req.body.password;
  await userService.deleteAccount(accountId, password);

  const response = await deleteUserPage(accountId);
  if (response.status === 200) {
    res.status(200).json({ message: "Successfully deleted the account" });
  }
};

module.exports = {
  signUp,
  updatePassword,
  deleteAccount,
};
