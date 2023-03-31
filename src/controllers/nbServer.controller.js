const nbServerService = require("../services/nbServer.service.js");

const getUserInfo = async (req, res) => {
  const accountId = req.query.accountId;
  const userInfo = await nbServerService.getUserInfo(accountId);
  res.status(200).json({ userInfo });
};

module.exports = { getUserInfo };
