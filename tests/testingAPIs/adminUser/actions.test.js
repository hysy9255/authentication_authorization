const mongoose = require("mongoose");
const {
  signUpInformation,
  adminSignInInformation,
} = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DB_URI_testingAPIs_adminUser_signIn;

const {
  signIn,
  signUp,
  blockAccount,
} = require("../../supertest/requestFunctions.js");

let adminJwt;
beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(databaseUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Sign up a regular user
  await signUp(signUpInformation);
  // Sign In an admin user
  const adminSignInResponse = await signIn(adminSignInInformation);
  adminJwt = adminSignInResponse.body.jsonWebToken;
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

test("Admin user blocking other user accounts", async () => {
  // when
  const emailToBlock = signUpInformation.email;
  const response = await blockAccount(adminJwt, emailToBlock);
  // expect
  expect(response.body.message).toBe("Admin blocked the account");
});
