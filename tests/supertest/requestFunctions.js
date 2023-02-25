const request = require("supertest");
const { createApp } = require("../../app.js");

const app = createApp();

const signUp = async (signUpInformation) => {
  const response = await request(app).post("/auth").send(signUpInformation);
  return response;
};

const signIn = async (signInInformation) => {
  const response = await request(app).get("/auth").send(signInInformation);
  return response;
};

const updatePassword = async (jsonWebToken, password, newPassword) => {
  const response = await request(app)
    .patch("/auth")
    .set("authorization", jsonWebToken)
    .send({ password, newPassword });
  return response;
};

const deleteAccount = async (jsonWebToken, password) => {
  const response = await request(app)
    .delete("/auth")
    .set("authorization", jsonWebToken)
    .send({ password });
  return response;
};

const blockAccount = async (adminJwt, emailToBlock) => {
  const response = await request(app)
    .delete("/authAdmin")
    .set("authorization", adminJwt)
    .send({ emailToBlock });
  return response;
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
  blockAccount,
};
