const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin.controller");
const { asyncWrap } = require("../utils/error");

adminRouter.get("/userAccount", asyncWrap(adminController.getAllUsers));
adminRouter.delete("/userAccount", asyncWrap(adminController.blockAccount));

module.exports = adminRouter;
