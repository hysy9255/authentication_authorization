const { detectError } = require("../../utils/error.js");

const signInControllerErrors = {
  checkInputValues: (accountInfo) => {
    if (Object.values(accountInfo).includes("")) {
      detectError("User information is missing", 400);
    }
  },
};

const userControllerErrors = {
  checkInputValues: (userInfo) => {
    if (Object.values(userInfo).includes("")) {
      detectError("User information is missing", 400);
    }
  },
  checkEmail: (email) => {
    const validEmail = email.split("").includes("@");
    if (!validEmail) {
      detectError("It's an invalid email address", 400);
    }
  },
  checkPassword: (password) => {
    const validPassword = password.length > 5;
    if (!validPassword) {
      detectError("It's an invalid password", 400);
    }
  },
};

module.exports = { signInControllerErrors, userControllerErrors };
