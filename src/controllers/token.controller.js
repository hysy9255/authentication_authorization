const tokenService = require("../services/token.service.js");
const error = require("./utils/controller.error.js");

const signIn = async (req, res) => {
  const accountInfo = req.body;
  error.checkInputValues(accountInfo);

  const token = await tokenService.signIn(accountInfo);
  res.status(200).send({ message: "Successfully signed in", token });
};

module.exports = { signIn };
