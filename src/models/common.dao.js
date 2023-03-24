const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");

const Account = mongoose.model("account", accountSchema);

const findAcctByEmail = async (email) => {
  try {
    const account = await Account.findOne({ email });
    return account;
  } catch (error) {
    throw error;
  }
};

module.exports = { findAcctByEmail };
