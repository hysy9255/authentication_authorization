const express = require("express");
const nbServerRouter = express.Router();
const nbServerController = require("./../controllers/nbServer.controller.js");
const { asyncWrap } = require("./../utils/error.js");

nbServerRouter.get("", asyncWrap(nbServerController.getUserInfo));

module.exports = nbServerRouter;
