const bcrypt = require("bcrypt");
const { detectError } = require("../../utils/error.js");
const userDao = require("../../models/user.dao.js");

const signInServiceErrors = {
  checkIfAcctExists: (account) => {
    if (account === null) {
      detectError("Given email is not found in DB", 404);
    }
  },
  checkIfAcctIsBlocked: (account) => {
    if (account.isBlocked) {
      detectError("The given email is blocked", 400);
    }
  },
  checkPassword: async (account, password) => {
    const hashedPassword = account.password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      detectError("Passed in wrong password", 400);
    }
  },
};

const userServiceErrors = {
  checkEmail: async (email) => {
    const alreadyInUse = await userDao.findAcctByEmail(email);
    if (alreadyInUse) {
      detectError("The email is already in use", 400);
    }
  },
  checkPassword: async (accountId, password) => {
    const account = await userDao.findAcctById(accountId);
    const hashedPassword = account.password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      detectError("Passed in wrong password", 400);
    }
  },
};

module.exports = { signInServiceErrors, userServiceErrors };
