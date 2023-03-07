const bcrypt = require("bcrypt");

const password = "adminPassword";

bcrypt.hash(password, 10).then((hashedPassword) => {
  console.log(hashedPassword);
});
