const signInService = require("../services/signIn.service.js");
const { signInControllerErrors } = require("./utils/controller.error.js");

const signIn = async (req, res) => {
  const accountInfo = req.body;
  signInControllerErrors.checkInputValues(accountInfo);
  const token = await signInService.signIn(accountInfo);
  res.status(200).send({ message: "Successfully signed in", token });
};

module.exports = { signIn };
