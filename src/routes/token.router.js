const express = require("express");
const tokenRouter = express.Router();
const tokenController = require("../controllers/token.controller.js");
const { asyncWrap } = require("../utils/error.js");

tokenRouter.post("", asyncWrap(tokenController.signIn));

module.exports = tokenRouter;
