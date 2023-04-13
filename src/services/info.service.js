const infoDao = require("../models/info.dao.js");
const { detectError } = require("../utils/error");

const getUserPageInfo = async (req, res) => {
  if (req.query.accountId === undefined && res.locals.accountId === undefined) {
    detectError("Either accountId or token has to be passed in", 400);
  }
  const accountId = req.query.accountId
    ? req.query.accountId
    : res.locals.accountId;

  const [userInfo] = await infoDao.getUserPageInfo(accountId);

  if (accountId === res.locals.accountId) {
    userInfo.modifyAllowed = true;
  } else {
    userInfo.modifyAllowed = false;
  }

  return userInfo;
};

const getUserInfo = async (accountId) => {
  const [userInfo] = await infoDao.getUserInfo(accountId);
  return userInfo;
};

const getMultipleUserInfos = async (accountIds) => {
  const userInfos = await infoDao.getMultipleUserInfos(accountIds);
  console.log(userInfos);
  return userInfos;
};

const getUserNames = async (accountIds) => {
  const userNameDocs = await infoDao.getUserNames(accountIds);

  const userNames = userNameDocs.map((doc) => doc.name);
  return userNames;
};

module.exports = {
  getUserPageInfo,
  getUserInfo,
  getMultipleUserInfos,
  getUserNames,
};
