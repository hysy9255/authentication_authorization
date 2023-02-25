const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  signUpInformation,
  signInInformation,
} = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DATABASE_URI_FOR_testingAPIs_regularUser_signIn;
const secreteKey = process.env.SECRETE_KEY;

const { signUp, signIn } = require("../../supertest/requestFunctions.js");

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(databaseUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await signUp(signUpInformation);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

test("Regular user signing in - prove it by verifying jwt", async () => {
  // when
  const response = await signIn(signInInformation);
  const jsonWebToken = response.body.jsonWebToken;
  const decodedJwt = jwt.verify(jsonWebToken, secreteKey);
  // expect
  expect(decodedJwt.email).toBe(signInInformation.email);
});
