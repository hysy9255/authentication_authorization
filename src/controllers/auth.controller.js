const authService = require("../services/auth.service.js");
const superagent = require("superagent");

const signUp = async (req, res, next) => {
  try {
    const user = await authService.signUp(
      req.body.name,
      req.body.email,
      req.body.password
    );
    const response = await superagent
      .post("http://localhost:5000/myPage")
      .send({ userInfo: user });

    if (response.body.message === "Successfully posted") {
      res
        .status(201)
        .json({ message: "User has been created!", userInfo: user });
    }
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const [token, user] = await authService.signIn(
      req.body.email,
      req.body.password
    );
    res
      .status(200)
      .send({ message: "Successfully signed in!", token, data: user });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const updated = await authService.updatePassword(
      token,
      req.body.password,
      req.body.newPassword
    );
    res.status(200).json({
      message: "Successfully updated the password!",
      updatedUser: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const [deletedUser, deleted] = await authService.deleteAccount(
      token,
      req.body.password
    );
    res.status(200).json({
      message: "Successfully deleted the account!",
      deletedUser,
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

const blockAccount = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const blockedUser = await authService.blockAccount(
      token,
      req.body.emailToBlock,
      req.body.adminPassword
    );
    res.status(200).json({
      message: "Admin blocked the account",
      blockedUser: blockedUser,
    });
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
