const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");
const { detectError } = require("../utils/error");

const signUp = async (userInfo) => {
  const { name, email, password } = userInfo;
  const alreadyInUse = await userDao.findUserByEmail(email);
  if (alreadyInUse) {
    detectError("The email is already in use", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userDao.signUp(name, email, hashedPassword);
};

const signIn = async (userInfo) => {
  const { email, password } = userInfo;
  const user = await userDao.findUserByEmail(email);
  if (user === null) {
    detectError("Given email is not found in DB", 404);
  }
  if (user.isBlocked) {
    detectError("The given email is blocked", 400);
  }
  const hashedPassword = user.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  const payload = {
    userId: user.id,
    isAdmin: user.isAdmin,
  };
  const isAdmin = user.isAdmin;
  const token = jwt.sign(payload, process.env.SECRETE_KEY);
  return [isAdmin, token];
};

const updatePassword = async (token, password, newPassword) => {
  const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
  const userId = decodedToken.userId;
  const user = await userDao.findUserById(userId);
  const hashedPassword = user.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await userDao.updatePassword(userId, hashedNewPassword);
};

const deleteAccount = async (token, password) => {
  const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
  const userId = decodedToken.userId;
  const user = await userDao.findUserById(userId);
  const hashedPassword = user.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
  await userDao.deleteAccount(userId);
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
};
