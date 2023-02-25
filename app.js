const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authController = require("./src/controllers/auth.controller.js");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  // Health Check
  app.get("/hello", async (req, res) => {
    res.status(200).send("another hello authentication");
  });

  app.post("/auth", authController.signUp);

  app.get("/auth", authController.signIn);

  app.patch("/auth", authController.updatePassword);

  app.delete("/auth", authController.deleteAccount);

  app.delete("/authAdmin", authController.blockAccount);

  return app;
};

module.exports = { createApp };
