const mongoose = require("mongoose");
const {
  signUpInformation,
  signInInformation,
} = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DB_URI_testingAPIs_regularUser_otherActions;

const {
  signUp,
  signIn,
  updatePassword,
  deleteAccount,
} = require("../../supertest/requestFunctions.js");

let jsonWebToken;
beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(databaseUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await signUp(signUpInformation);
  const response = await signIn(signInInformation);
  jsonWebToken = response.body.jsonWebToken;
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

test("Updating password", async () => {
  // when
  const password = signUpInformation.password;
  const newPassword = "newPassword";
  const response = await updatePassword(jsonWebToken, password, newPassword);
  // expect
  expect(response.body.message).toBe("Successfully updated the password!");
});

test("Deleting own account", async () => {
  // when
  const password = signInInformation.password;
  const deleteResponse = await deleteAccount(jsonWebToken, password);
  // expect
  expect(deleteResponse.body.message).toBe("Successfully deleted the account!");
});
