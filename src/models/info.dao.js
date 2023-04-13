const mongoose = require("mongoose");
const { accountSchema } = require("../schemas/account.schema.js");
const ObjectId = mongoose.Types.ObjectId;

const Account = mongoose.model("account", accountSchema);

const getUserPageInfo = async (accountId) => {
  const agg = [
    { $match: { _id: ObjectId(accountId) } },
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        profileImage: 1,
        description: 1,
      },
    },
  ];
  try {
    return await Account.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

const getUserInfo = async (accountId) => {
  const agg = [
    { $match: { _id: ObjectId(accountId) } },
    { $addFields: { accountId: "$_id" } },
    { $project: { _id: 0, name: 1, email: 1, profileImage: 1 } },
  ];
  try {
    return await Account.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

const getMultipleUserInfos = async (accountIds) => {
  accountIds = accountIds.map((accountId) => ObjectId(accountId));
  const agg = [
    { $match: { _id: { $in: accountIds } } },
    { $addFields: { accountId: "$_id" } },
    { $project: { _id: 0, accountId: 1, name: 1, email: 1, profileImage: 1 } },
  ];
  try {
    return await Account.aggregate(agg);
  } catch (error) {
    throw error;
  }
};

const getUserNames = async (accountIds) => {
  accountIds = accountIds.map((elem) => new ObjectId(elem));
  try {
    return await Account.find(
      { _id: { $in: accountIds } },
      { _id: 0, name: 1 }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserInfo,
  getUserPageInfo,
  getMultipleUserInfos,
  getUserNames,
};
