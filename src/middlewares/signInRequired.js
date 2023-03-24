const jwt = require("jsonwebtoken");
const { detectError } = require("./../utils/error");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      detectError("TOKEN_DOES_NOT_EXIST");
    }
    const decoded = await jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded) {
      detectError("DECODING_TOKEN_FAILED");
    }
    res.locals.id = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
