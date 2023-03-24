const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
};

// hashPassword("adminPassword");

const myFunction = async () => {
  const hashedUserName = await bcrypt.hash("윤형준", 10);
  const payload = {
    userName: hashedUserName,
    isAdmin: "hi",
  };

  const token = jwt.sign(payload, "hello");
  console.log("token : ");
  console.log(token);
  // import jwt_decode from "jwt-decode";
  const jwt_decode = require("jwt-decode");
  const decoded_jwt = jwt_decode(token);
  console.log("decoded token : ");
  console.log(decoded_jwt);
};

myFunction();
