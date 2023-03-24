const express = require("express");
const userRouter = require("./user.router.js");
const adminRouter = require("./admin.router.js");
const commonRouter = require("./common.router.js");

const routes = express.Router();
routes.use("/auth/user", userRouter);
routes.use("/auth/admin", adminRouter);
routes.use("/auth", commonRouter);

module.exports = routes;
