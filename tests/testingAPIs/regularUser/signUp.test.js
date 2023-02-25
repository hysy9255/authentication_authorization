const mongoose = require("mongoose");
const { signUpInformation } = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DATABASE_URI_FOR_testingAPIs_regularUser_signUP;

const { signUp } = require("../../supertest/requestFunctions.js");

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

test("Regular user signing up", async () => {
  // when
  const response = await signUp(signUpInformation);
  // expect
  expect(response.body.message).toBe("User has been created!");
});
