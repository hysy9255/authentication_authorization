const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { userSchema } = require("../schemas/user.schema.js");

const User = mongoose.model("user", userSchema);

const signUp = async (name, email, password) => {
  try {
    const user = await User.create({
      name,
      email,
      password,
      isAdmin: false,
      isBlocked: false,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const findAnAccount = async (email) => {
  try {
    const user = await User.findOne(
      { email },
      { email: 1, name: 1, password: 1, isAdmin: 1, isBlocked: 1 }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (email, newHashedPassword) => {
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      throw new Error(
        "There is no user that corresponds to the information given"
      );
    }
    user.password = newHashedPassword;
    const updated = await user.save();
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (email) => {
  try {
    const deleted = await User.deleteOne({ email });
    return deleted;
  } catch (error) {
    throw error;
  }
};

const blockAccount = async (emailToBlock) => {
  try {
    const user = await User.findOne({ email: emailToBlock });
    user.isBlocked = true;
    const blocked = await user.save();
    return blocked;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signUp,
  findAnAccount,
  updatePassword,
  deleteAccount,
  blockAccount,
};
