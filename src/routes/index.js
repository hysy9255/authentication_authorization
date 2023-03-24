const express = require("express");
const userRouter = require("./user.router");
const adminRouter = require("./admin.router");

const routes = express.Router();
routes.use("/auth/user", userRouter);
routes.use("/auth/admin", adminRouter);

module.exports = routes;
