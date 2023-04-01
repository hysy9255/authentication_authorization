const express = require("express");
const infoRouter = express.Router();
const infoController = require("../controllers/info.controller.js");
const { asyncWrap } = require("../utils/error.js");

infoRouter.get("", asyncWrap(infoController.getUserInfo));

module.exports = infoRouter;
