const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");

const Account = mongoose.model("account", accountSchema);

const findAcctById = async (accountId) => {
  try {
    const account = await Account.findById(accountId);
    return account;
  } catch (error) {
    throw error;
  }
};

module.exports = { findAcctById };
