const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");
const Account = mongoose.model("account", accountSchema);
// ***
const findAcctByEmail = async (email) => {
  try {
    return await Account.findOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = { findAcctByEmail };
