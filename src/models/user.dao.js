const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");

const Account = mongoose.model("account", accountSchema);

const signUp = async (name, email, password) => {
  try {
    await Account.create({
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

const findAcctByEmail = async (email) => {
  try {
    const account = await Account.findOne({ email });
    return account;
  } catch (error) {
    throw error;
  }
};

const findAcctById = async (accountId) => {
  try {
    const account = await Account.findOne({ _id: accountId });
    return account;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (accountId, newHashedPassword) => {
  try {
    const account = await Account.findOne({ _id: accountId });
    account.password = newHashedPassword;
    await account.save();
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (accountId) => {
  try {
    await Account.deleteOne({ _id: accountId });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signUp,
  findAcctByEmail,
  findAcctById,
  updatePassword,
  deleteAccount,
};
