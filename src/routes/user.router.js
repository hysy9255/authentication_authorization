const express = require("express");
const userController = require("./../controllers/user.controller.js");
const { asyncWrap } = require("./../utils/error.js");
const { verifyUser } = require("./../middlewares/signInRequired.js");

const userRouter = express.Router();
userRouter.post("/signUp", asyncWrap(userController.signUp));
userRouter.patch(
  "/password",
  verifyUser,
  asyncWrap(userController.updatePassword)
);
userRouter.delete(
  "/account",
  verifyUser,
  asyncWrap(userController.deleteAccount)
);

module.exports = userRouter;
