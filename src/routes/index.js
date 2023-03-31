const express = require("express");
const userRouter = require("./user.router.js");
const adminRouter = require("./admin.router.js");
const signInRouter = require("./signIn.router.js");
const nbServerRouter = require("./nbServer.router.js");

const routes = express.Router();
routes.use("/auth/user", userRouter);
routes.use("/auth/admin", adminRouter);
routes.use("/auth", signInRouter);
routes.use("/auth/userInfo", nbServerRouter);

module.exports = routes;
