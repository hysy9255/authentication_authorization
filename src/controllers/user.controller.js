const userService = require("../services/user.service.js");
const superagent = require("superagent");
const { detectError } = require("./../utils/error.js");

const signUp = async (req, res) => {
  const userInfo = req.body;
  if (Object.values(userInfo).includes("")) {
    detectError("User information is missing", 400);
  }
  await userService.signUp(userInfo);

  const userPageIP = "http://localhost:5000/userPage";
  const resFromUserPage = await superagent.post(userPageIP).send(userInfo);

  if (resFromUserPage.status === 201) {
    res.status(201).json({ message: "User has been created!" });
  }
};

const signIn = async (req, res) => {
  const userInfo = req.body;
  if (Object.values(userInfo).includes("")) {
    detectError("User information is missing", 400);
  }
  const [isAdmin, token] = await userService.signIn(userInfo);
  res.status(200).send({ message: "Successfully signed in", isAdmin, token });
};

const updatePassword = async (req, res) => {
  const token = req.headers.authorization;
  await userService.updatePassword(
    token,
    req.body.password,
    req.body.newPassword
  );
  res.status(200).json({
    message: "Successfully updated the password!",
  });
};

const deleteAccount = async (req, res) => {
  const token = req.headers.authorization;
  await userService.deleteAccount(token, req.body.password);
  res.status(200).json({ message: "Successfully deleted the account!" });
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
};
