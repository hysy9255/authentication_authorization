const mongoose = require("mongoose");
const { userSchema } = require("../schemas/user.schema.js");

const User = mongoose.model("user", userSchema);

const insert = async (userInformation) => {
  try {
    const user = await User.create(userInformation);
    return user;
  } catch (error) {
    throw error;
  }
};

const retrieve = async (email) => {
  try {
    const user = await User.findOne({ email }, { email: 1, name: 1 });
    return user;
  } catch (error) {
    throw error;
  }
};

const update = async (email, newHashedPassword) => {
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

const remove = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      throw new Error(
        "There is no user that corresponds to the information given"
      );
    }
    await User.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = { insert, retrieve, update, remove };
