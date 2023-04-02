const express = require("express");
const adminRouter = express.Router();
const { verifyAdmin } = require("./../middlewares/signInRequired");
const {
  showAccounts,
  blockAccount,
} = require("./../controllers/admin.controller");

adminRouter.use(verifyAdmin);

adminRouter.get("/userAccounts", showAccounts);
adminRouter.patch("/userAccount/access", blockAccount);

module.exports = adminRouter;
