const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin.controller");
const { asyncWrap } = require("../utils/error");
const { verifyAdmin } = require("./../middlewares/signInRequired");

adminRouter.use(verifyAdmin);
adminRouter.get("/userAccount", asyncWrap(adminController.showAccounts));
adminRouter.patch(
  "/userAccount/access",
  asyncWrap(adminController.blockAccount)
);

module.exports = adminRouter;
