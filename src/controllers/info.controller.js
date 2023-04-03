const infoService = require("../services/info.service.js");
const { asyncWrap } = require("../utils/error.js");

const getUserInfo = asyncWrap(async (req, res) => {
  const accountId = req.query.accountId;

  const userInfo = await infoService.getUserInfo(accountId);

  res.status(200).json({ userInfo });
});

module.exports = { getUserInfo };
