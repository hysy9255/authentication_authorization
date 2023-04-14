const bcrypt = require("bcrypt");
const { detectError } = require("../../utils/error.js");
const userDao = require("../../models/user.dao.js");
// ***
const checkIfAcctExist = (account) => {
  if (account === null) {
    detectError("Given email is not found in DB", 404);
  }
};
// ***
const checkIfAcctIsBlocked = (account) => {
  if (account.isBlocked) {
    detectError("The given email is blocked", 400);
  }
};
// ***
const checkPassword = async (account, password) => {
  const hashedPassword = account.password;
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatches) {
    detectError("Passed in wrong password", 400);
  }
};
// ***
const checkEmail = async (email) => {
  const alreadyInUse = await userDao.findAcctByEmail(email);
  if (alreadyInUse) {
    detectError("The email is already in use", 400);
  }
};

module.exports = {
  checkIfAcctExist,
  checkIfAcctIsBlocked,
  checkPassword,
  checkEmail,
};
