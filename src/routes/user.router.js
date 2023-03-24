const express = require("express");
const userRouter = express.Router();
const userController = require("./../controllers/user.controller");
const { asyncWrap } = require("./../utils/error");
const verifyUser = require("./../middlewares/signInRequired");

userRouter.post("/signUp", asyncWrap(userController.signUp));
userRouter.post("/signIn", asyncWrap(userController.signIn));
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
