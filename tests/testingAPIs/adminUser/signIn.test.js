const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { adminSignInInformation } = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DB_URI_testingAPIs_adminUser_signIn;

const { signIn } = require("../../supertest/requestFunctions.js");

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(databaseUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

test("Admin user signing in", async () => {
  // when
  const adminSignInResponse = await signIn(adminSignInInformation);
  const adminJwt = adminSignInResponse.body.jsonWebToken;
  // expect
  const decodedJwt = jwt.verify(adminJwt, process.env.ADMIN_SECRETE_KEY);
  expect(decodedJwt.email).toBe(process.env.ADMIN_EMAIL);
});
