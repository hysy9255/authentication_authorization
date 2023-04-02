const superagent = require("superagent");
const userPageServerAddress = "http://localhost:5000/userPage";

const createUserPage = async (account) => {
  return await superagent.post(userPageServerAddress).send({
    accountId: account._id,
    name: account.name,
    email: account.email,
  });
};

const deleteUserPage = async (accountId) => {
  return await superagent.delete(userPageServerAddress).send({ accountId });
};

module.exports = { createUserPage, deleteUserPage };
