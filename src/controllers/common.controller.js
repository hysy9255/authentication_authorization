const commonService = require("../services/common.service.js");
const { detectError } = require("./../utils/error.js");

const signIn = async (req, res) => {
  const userInfo = req.body;
  if (Object.values(userInfo).includes("")) {
    detectError("User information is missing", 400);
  }
  const token = await commonService.signIn(userInfo);
  res.status(200).send({ message: "Successfully signed in", token });
};

module.exports = { signIn };
