const infoService = require("../services/info.service.js");
const { asyncWrap } = require("../utils/error.js");

const getUserPageInfo = asyncWrap(async (req, res) => {
  const userInfo = await infoService.getUserPageInfo(req, res);
  res.status(200).json(userInfo);
});

const getUserInfo = asyncWrap(async (req, res) => {
  const { accountId } = req.query;
  const userInfo = await infoService.getUserInfo(accountId);
  res.status(200).json(userInfo);
});

const getMultipleUserInfos = asyncWrap(async (req, res) => {
  const { accountIds } = req.query;
  const userInfos = await infoService.getMultipleUserInfos(accountIds);
  res.status(200).json(userInfos);
});

const getUserNames = asyncWrap(async (req, res) => {
  const accountIds = req.body.accountIds;

  const userNames = await infoService.getUserNames(accountIds);

  res.status(200).json({ userNames });
});

module.exports = {
  getUserPageInfo,
  getUserInfo,
  getMultipleUserInfos,
  getUserNames,
};
