const infoService = require("../services/info.service.js");

const getUserInfo = async (req, res) => {
  const accountId = req.query.accountId;
  const userInfo = await infoService.getUserInfo(accountId);
  res.status(200).json({ userInfo });
};

module.exports = { getUserInfo };
