const express = require("express");
const tokenRouter = express.Router();
const { signIn } = require("../controllers/token.controller.js");

tokenRouter.post("", signIn);

module.exports = tokenRouter;
