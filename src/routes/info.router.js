const express = require("express");
const infoRouter = express.Router();
const { verifyUserOptionally } = require("../middlewares/signInRequired");
const {
  getUserPageInfo,
  getUserInfo,
  getMultipleUserInfos,
  getUserNames,
} = require("../controllers/info.controller.js");

infoRouter.get("userPage", verifyUserOptionally, getUserPageInfo);
infoRouter.get("", getUserInfo);
infoRouter.get("/list", getMultipleUserInfos);
infoRouter.post("/userNames", getUserNames);

module.exports = infoRouter;
