const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");

const Account = mongoose.model("account", accountSchema);

const showAccounts = async () => {
  try {
    return await Account.find({});
  } catch (error) {
    throw error;
  }
};

const blockAccount = async (userId) => {
  try {
    const account = await Account.findOne({ _id: userId });
    console.log(userId);
    account.isBlocked = account.isBlocked ? false : true;
    await account.save();
  } catch (error) {
    throw error;
  }
};

const findAcctById = async (accountId) => {
  try {
    const account = await Account.findById(accountId);
    return account;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  showAccounts,
  blockAccount,
  findAcctById,
};
