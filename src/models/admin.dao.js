const mongoose = require("mongoose");
const { userSchema } = require("../schemas/user.schema.js");

const User = mongoose.model("user", userSchema);

const getAllUsers = async () => {
  try {
    const user = await User.find({});
    return user;
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
  getAllUsers,
  blockAccount,
};
