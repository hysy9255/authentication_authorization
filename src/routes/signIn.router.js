const express = require("express");
const signInRouter = express.Router();
const signInController = require("../controllers/signIn.controller.js");
const { asyncWrap } = require("../utils/error.js");

signInRouter.post("/signIn", asyncWrap(signInController.signIn));

module.exports = signInRouter;
