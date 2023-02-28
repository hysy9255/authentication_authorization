const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");

require("dotenv").config({ path: "../../env/.env" });

const signUp = async (userInformation) => {
  try {
    const password = userInformation.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    userInformation.password = hashedPassword;
    await userDao.insert(userInformation);
  } catch (error) {
    throw error;
  }
};

const signIn = async (userInformation) => {
  try {
    const email = userInformation.email;
    const payload = { email };
    const jsonWebToken = jwt.sign(payload, process.env.SECRETE_KEY);
    return jsonWebToken;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (jsonWebToken, newPassword) => {
  try {
    const decodedJwt = jwt.verify(jsonWebToken, process.env.SECRETE_KEY);
    const email = decodedJwt.email;

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await userDao.update(email, hashedNewPassword);
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (jsonWebToken) => {
  try {
    const decodedJwt = jwt.verify(jsonWebToken, process.env.SECRETE_KEY);
    const email = decodedJwt.email;
    await userDao.remove(email);
  } catch (error) {
    throw error;
  }
};

const blockAccount = async (emailToBlock) => {
  try {
    await userDao.remove(emailToBlock);
  } catch (error) {
    // // Regular user's jwt is signed with process.env.SECRETE_KEY
    // // So if blockAccount is invoked with regular user's jwt
    // // invalid signature error will be called from jwt.verify
    // if (error.message === "invalid signature") {
    //   throw new Error("Only Admin account can block other accounts");
    // }
    throw error;
  }
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
  blockAccount,
};
