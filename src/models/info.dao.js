const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");

const Account = mongoose.model("account", accountSchema);

const findAcctById = async (accountId) => {
  try {
    return await Account.findById(accountId);
  } catch (error) {
    throw error;
  }
};

module.exports = { findAcctById };
