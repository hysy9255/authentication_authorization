const userService = require("../services/user.service.js");
const superagent = require("superagent");
const { detectError } = require("./../utils/error.js");

const signUp = async (req, res) => {
  const userInfo = req.body;
  if (Object.values(userInfo).includes("")) {
    detectError("User information is missing", 400);
  }

  const validEmail = userInfo.email.split("").includes("@");
  if (!validEmail) {
    detectError("It's an invalid email address", 400);
  }

  const validPassword = userInfo.password.length > 5;
  if (!validPassword) {
    detectError("It's an invalid password", 400);
  }

  await userService.signUp(userInfo);

  const userPageIP = "http://localhost:5000/userPage";
  const resFromUserPage = await superagent.post(userPageIP).send(userInfo);

  if (resFromUserPage.status === 201) {
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
  res.status(200).json({ message: "Successfully deleted the account!" });
};

module.exports = {
  signUp,
  updatePassword,
  deleteAccount,
};
