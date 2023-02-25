const mongoose = require("mongoose");
const {
  signUpInformation,
  signInInformation,
} = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DB_URI_testingErrors_updatePassword;

const {
  signUp,
  signIn,
  updatePassword,
} = require("../../supertest/requestFunctions.js");

describe("Test regular user sign up errors", () => {
  beforeAll(() => {
    mongoose.set("strictQuery", true);
    mongoose.connect(databaseUri);
  });

  afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    mongoose.connection.close();
  });

  test("Wrong password passed in", async () => {
    // given 1
    await signUp(signUpInformation);
    // given 2
    const signInResponse = await signIn(signInInformation);
    const jsonWebToken = signInResponse.body.jsonWebToken;
    const password = "randomPassword";
    const newPassword = "newRandomPassword";
    // when
    const response = await updatePassword(jsonWebToken, password, newPassword);
    // expect
    expect(response.body.message).toBe("Wrong password passed in");
  });
});
