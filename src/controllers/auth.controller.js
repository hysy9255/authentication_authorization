const authService = require("../services/auth.service.js");
require("dotenv").config({ path: "../../env/.env" });

const signUp = async (req, res, next) => {
  try {
    const userInformation = req.body;
    await authService.signUp(userInformation);
    const resBody = { message: "User has been created!" };
    res.status(201).json(resBody);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const userInformation = req.body;
    const jsonWebToken = await authService.signIn(userInformation);
    const resBody = { message: "Successfully signed in!", jsonWebToken };
    res.status(200).send(resBody);
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const userInformation = req.body;
    const newPassword = userInformation.newPassword;
    const jsonWebToken = req.headers.authorization;
    await authService.updatePassword(jsonWebToken, newPassword);
    res.status(200).json({ message: "Successfully updated the password!" });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const jsonWebToken = req.headers.authorization;
    await authService.deleteAccount(jsonWebToken);
    res.status(200).json({ message: "Successfully deleted the account!" });
  } catch (error) {
    next(error);
  }
};

const blockAccount = async (req, res, next) => {
  try {
    const emailToBlock = req.body.emailToBlock;
    await authService.blockAccount(emailToBlock);
    res.status(200).json({ message: "Admin blocked the account" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
  blockAccount,
};
