const express = require("express");
const infoRouter = express.Router();
const { getUserInfo } = require("../controllers/info.controller.js");

infoRouter.get("", getUserInfo);

module.exports = infoRouter;
