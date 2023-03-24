const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes/index.js");
const { globalErrorHandler } = require("./src/middlewares/errorHandler.js");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  app.use(routes);

  app.get("/hello", async (req, res) => {
    res.status(200).send("Hello Authentication Server!");
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = createApp;
