const express = require("express");
const commonRouter = express.Router();
const commonController = require("./../controllers/common.controller.js");
const { asyncWrap } = require("./../utils/error.js");

commonRouter.post("/signIn", asyncWrap(commonController.signIn));

module.exports = commonRouter;
