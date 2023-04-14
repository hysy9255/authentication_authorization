const express = require("express");
const userRouter = require("./user.router.js");
const adminRouter = require("./admin.router.js");
const tokenRouter = require("./token.router.js");
const infoRouter = require("./info.router.js");

const routes = express.Router();
routes.use("/auth/user", userRouter); // ***
routes.use("/auth/admin", adminRouter);
routes.use("/auth/token", tokenRouter); // ***
routes.use("/auth/userInfo", infoRouter);

module.exports = routes;
