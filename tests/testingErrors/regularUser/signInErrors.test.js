const mongoose = require("mongoose");
const {
  signUpInformation,
  signInInformation,
} = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DB_URI_testingErrors_signIn;

const { signUp, signIn } = require("../../supertest/requestFunctions.js");

describe("Test regular user sign up errors", () => {
  beforeAll(() => {
    mongoose.set("strictQuery", true);
    mongoose.connect(databaseUri);
  });

  afterAll(async () => {
    mongoose.connection.close();
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

  test("[email, password] One of them is missing", async () => {
    // when
    const email = undefined;
    const password = undefined;
    const response = await signIn({ email, password });
    // expect
    expect(response.body.message).toBe(
      "One or more of the required fields are missing"
    );
  });

  test("[email, password] One of them is missing", async () => {
    // when
    const email = "random@random";
    const password = signUpInformation.password;
    const response = await signIn({ email, password });
    // expect
    expect(response.body.message).toBe("Given email is not found in DB");
  });

  test("Wrong password passed in", async () => {
    // when
    const email = signInInformation.email;
    const password = "randomPassword";
    const response = await signIn({ email, password });
    // expect
    expect(response.body.message).toBe("Passed in wrong password");
  });
});
