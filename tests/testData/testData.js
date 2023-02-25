require("dotenv").config({ path: "../../../env/.env" });

const name = "shawn";
const email = "hysy9255@gmail.com";
const password = "dbsgudwns";

const signUpInformation = { name, email, password };
const signInInformation = { email, password };

const adminSignInInformation = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

module.exports = {
  signUpInformation,
  signInInformation,
  adminSignInInformation,
};
