const mongoose = require("mongoose");
const { signUpInformation } = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DATABASE_URI_FOR_testingErrors_signUp;

const { signUp } = require("../../supertest/requestFunctions.js");

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

  test("[name, email, password] One of them is missing", async () => {
    // when
    const userInformation = {
      name: undefined,
      email: undefined,
      password: undefined,
    };
    const response = await signUp(userInformation);
    // expect
    expect(response.body.message).toBe(
      "One or more of the required fields are missing"
    );
  });

  test("Invalid email address", async () => {
    // when
    const userInformation = {
      name: "shawn",
      email: "yhjyhj92gmail.com",
      password: "dbsgudwns",
    };
    const response = await signUp(userInformation);
    // expect
    expect(response.body.message).toBe("It's an invalid email address");
  });

  test("Invalid password", async () => {
    // when
    const userInformation = {
      name: "shawn",
      email: "yhjyhj92@gmail.com",
      password: "dbs",
    };
    const response = await signUp(userInformation);
    // expect
    expect(response.body.message).toBe("It's an invalid password");
  });

  test("Email address already taken", async () => {
    // given
    await signUp(signUpInformation);
    // when
    const response = await signUp(signUpInformation);
    // expect
    expect(response.body.message).toBe("The email is already in use");
  });
});
