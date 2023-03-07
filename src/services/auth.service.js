const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/user.dao");

const signUp = async (name, email, password) => {
  try {
    const alreadyInUse = await userDao.findAnAccount(email);
    if (alreadyInUse) {
      throw new Error("The email is already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userDao.signUp(name, email, hashedPassword);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    };

    return userInfo;
  } catch (error) {
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const user = await userDao.findAnAccount(email);
    if (user === null) {
      throw new Error("Given email is not found in DB");
    }

    if (user.isBlocked) {
      throw new Error("차단된 계정입니다");
    }

    const hashedPassword = user.password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      throw new Error("Passed in wrong password");
    }

    const payload = {
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.SECRETE_KEY);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    };
    return [token, userInfo];
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (token, password, newPassword) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    const email = decodedToken.email;

    const user = await userDao.findAnAccount(email);
    const hashedPassword = user.password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      throw new Error("Wrong password passed in");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updated = await userDao.updatePassword(email, hashedNewPassword);

    const updatedUser = {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
      isBlocked: updated.isBlocked,
    };

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (token, password) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    const email = decodedToken.email;

    const user = await userDao.findAnAccount(email);
    if (user === null) {
      throw new Error(
        "There is no user that corresponds to the information given"
      );
    }
    const hashedPassword = user.password;

    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatches) {
      throw new Error("The password passed in to verify the user is incorrect");
    }
    const deleted = await userDao.deleteAccount(email);

    const deletedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    };

    return [deletedUser, deleted];
  } catch (error) {
    throw error;
  }
};

const blockAccount = async (token, emailToBlock, adminPassword) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETE_KEY);
    const isAdmin = decodedToken.isAdmin;
    if (!isAdmin) {
      throw new Error("Only admin account can block other users");
    }

    const adminEmail = decodedToken.email;
    const adminUser = await userDao.findAnAccount(adminEmail);
    if (!adminUser) {
      throw new Error(
        "해당 토큰을 발급한 어드민 계정이 더이상 유효하지 않습니다"
      );
    }
    const hashedPassword = adminUser.password;
    const passwordMatches = await bcrypt.compare(adminPassword, hashedPassword);
    if (!passwordMatches) {
      throw new Error("The password passed in to verify the user is incorrect");
    }

    const user = await userDao.findAnAccount(emailToBlock);
    if (!user) {
      throw new Error("차단하고자 하는 계정이 존재하지 않습니다");
    }

    const blocked = await userDao.blockAccount(emailToBlock);
    const blockedUser = {
      _id: blocked._id,
      name: blocked.name,
      email: blocked.email,
      isAdmin: blocked.isAdmin,
      isBlocked: blocked.isBlocked,
    };
    return blockedUser;
  } catch (error) {
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
