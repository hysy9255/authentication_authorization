require("dotenv").config({ path: "../../env/.env" });
const jwt = require("jsonwebtoken");

const adminValidator = (req, res, next) => {
  const userInformation = req.body;
  const email = userInformation.email;
  const password = userInformation.password;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const payload = { email };
    const jsonWebToken = jwt.sign(payload, process.env.ADMIN_SECRETE_KEY);
    const resBody = {
      message: "Successfully signed in as admin!",
      jsonWebToken,
    };
    return res.status(200).send(resBody);
  }
  next();
};

module.exports = { adminValidator };
