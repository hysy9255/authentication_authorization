const request = require("supertest");
const { createApp } = require("../../app.js");

const app = createApp();

const signUp = async (name, email, password) => {
  const response = await request(app)
    .post("/auth")
    .send({ name, email, password });
  return response;
};

const signIn = async (email, password) => {
  const response = await request(app).get("/auth").send({ email, password });
  return response;
};

const updatePassword = async (token, password, newPassword) => {
  const response = await request(app)
    .patch("/auth")
    .set("authorization", token)
    .send({ password, newPassword });
  return response;
};

const deleteAccount = async (token, password) => {
  const response = await request(app)
    .delete("/auth")
    .set("authorization", token)
    .send({ password });
  return response;
};

const blockAccount = async (adminToken, adminPassword, emailToBlock) => {
  const response = await request(app)
    .delete("/authAdmin")
    .set("authorization", adminToken)
    .send({ adminPassword, emailToBlock });
  return response;
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
  blockAccount,
};
