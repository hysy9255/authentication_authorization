const { detectError } = require("../../utils/error.js");
// ***
const checkInputValues = (userInfo) => {
  if (Object.values(userInfo).includes("")) {
    detectError("User information is missing", 400);
  }
};
// ***
const checkEmail = (email) => {
  const validEmail = email.split("").includes("@");
  if (!validEmail) {
    detectError("It's an invalid email address", 400);
  }
};
// ***
const checkPassword = (password) => {
  const validPassword = password.length > 5;
  if (!validPassword) {
    detectError("It's an invalid password", 400);
  }
};

module.exports = { checkInputValues, checkEmail, checkPassword };
