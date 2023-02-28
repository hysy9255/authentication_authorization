const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../env/.env" });

const blockAccountValidator = (req, res, next) => {
  const adminJwt = req.headers.authorization;
  try {
    // When jwt signature gets updated,
    // admin should log in again to get new jwt signed with new signature.
    // In that case, the code below will throw an error
    const decodedAdminJwt = jwt.verify(adminJwt, process.env.ADMIN_SECRETE_KEY);
    const adminEmail = decodedAdminJwt.email;

    // When admin email gets updated
    // admin show log in again with new admin eamil and get the new jwt.
    if (adminEmail !== process.env.ADMIN_EMAIL) {
      const error = new Error("Please login with new admin email address.");
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { blockAccountValidator };
