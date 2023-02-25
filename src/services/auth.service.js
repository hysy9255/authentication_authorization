const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");

require("dotenv").config({ path: "../../env/.env" });

const signUp = async (userInformation) => {
  try {
    if (
      userInformation.name === undefined ||
      userInformation.email === undefined ||
      userInformation.password === undefined
    ) {
      throw new Error("One or more of the required fields are missing");
    }

    const validEmail = userInformation.email.split("").includes("@");
    if (!validEmail) {
      throw new Error("It's an invalid email address");
    }

    const validPassword = userInformation.password.length > 5;
    if (!validPassword) {
      throw new Error("It's an invalid password");
    }

    const alreadyInUse = await userDao.retrive(userInformation.email);
    if (alreadyInUse) {
      throw new Error("The email is already in use");
    }

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
    const password = userInformation.password;

    let isAdmin;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      isAdmin = true;
    }

    if (isAdmin) {
      const payload = { email };
      const jsonWebToken = jwt.sign(payload, process.env.ADMIN_SECRETE_KEY);
      return jsonWebToken;
    }

    if (email === undefined || password === undefined) {
      throw new Error("One or more of the required fields are missing");
    }

    const user = await userDao.retrive(email);
    if (user === null) {
      throw new Error("Given email is not found in DB");
    }

    const hashedPassword = user.password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    console.log(passwordMatches);
    if (passwordMatches) {
      const payload = { email };
      const jsonWebToken = jwt.sign(payload, process.env.SECRETE_KEY);
      return jsonWebToken;
    } else {
      throw new Error("Passed in wrong password");
    }
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (jsonWebToken, password, newPassword) => {
  try {
    const decodedJwt = jwt.verify(jsonWebToken, process.env.SECRETE_KEY);
    const email = decodedJwt.email;

    const user = await userDao.retrive(email);
    const hashedPassword = user.password;

    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (passwordMatches) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await userDao.update(email, hashedNewPassword);
    } else {
      throw new Error("Wrong password passed in");
    }
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (jsonWebToken, password) => {
  try {
    const decodedJwt = jwt.verify(jsonWebToken, process.env.SECRETE_KEY);
    const email = decodedJwt.email;

    const user = await userDao.retrive(email);
    const hashedPassword = user.password;

    // Don't get rid of await here. It is necessary.
    const matches = await bcrypt.compare(password, hashedPassword);
    if (matches) {
      await userDao.remove(email);
    } else {
      throw new Error("The password passed in to verify the user is incorrect");
    }
  } catch (error) {
    throw error;
  }
};

const blockAccount = async (adminJwt, emailToBlock) => {
  try {
    // When jwt signature gets updated, it will throw
    // "Only Admin account can block other accounts" error.
    // When this happends, admin should log in again to get new jwt signed with new signature.
    const decodedAdminJwt = jwt.verify(adminJwt, process.env.ADMIN_SECRETE_KEY);
    if (decodedAdminJwt.email === process.env.ADMIN_EMAIL) {
      await userDao.remove(emailToBlock);
    } else {
      throw new Error("Please login with new admin email address.");
    }
  } catch (error) {
    // Regular user's jwt is signed with process.env.SECRETE_KEY
    // So if blockAccount is invoked with regular user's jwt
    // invalid signature error will be called from jwt.verify
    if (error.message === "invalid signature") {
      throw new Error("Only Admin account can block other accounts");
    }
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
