const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authController = require("./src/controllers/auth.controller.js");

const { signUpValidator } = require("./src/utils/signUpValidation.js");
const { signInValidator } = require("./src/utils/signInValidation.js");
const { adminValidator } = require("./src/utils/adminValidation.js");
const {
  updatePasswordValidator,
} = require("./src/utils/updatePasswordValidation.js");
const {
  deleteAccountValidator,
} = require("./src/utils/deleteAccountValidation.js");
const {
  blockAccountValidator,
} = require("./src/utils/blockAccountValidation.js");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  // Health Check
  app.get("/hello", async (req, res) => {
    res.status(200).send("another hello authentication");
  });

  app.post("/auth", signUpValidator, authController.signUp);

  app.get("/auth", adminValidator, signInValidator, authController.signIn);

  app.patch("/auth", updatePasswordValidator, authController.updatePassword);

  app.delete("/auth", deleteAccountValidator, authController.deleteAccount);

  app.delete("/authAdmin", blockAccountValidator, authController.blockAccount);

  app.use((error, req, res, next) => {
    res.status(400).json({ message: error.message });
  });

  return app;
};

module.exports = { createApp };
