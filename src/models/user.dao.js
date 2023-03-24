const mongoose = require("mongoose");
const { userSchema } = require("../schemas/user.schema.js");

const User = mongoose.model("user", userSchema);

const signUp = async (name, email, password) => {
  try {
    await User.create({
      name,
      email,
      password,
      isAdmin: false,
      isBlocked: false,
    });
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne(
      { email },
      { _id: 1, email: 1, name: 1, password: 1, isAdmin: 1, isBlocked: 1 }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findOne(
      { _id: userId },
      { _id: 1, email: 1, name: 1, password: 1, isAdmin: 1, isBlocked: 1 }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (userId, newHashedPassword) => {
  try {
    const user = await User.findOne({ _id: userId });
    user.password = newHashedPassword;
    await user.save();
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (userId) => {
  try {
    await User.deleteOne({ _id: userId });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signUp,
  findUserByEmail,
  findUserById,
  updatePassword,
  deleteAccount,
};
