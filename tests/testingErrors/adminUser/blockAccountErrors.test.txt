const mongoose = require("mongoose");
const {
  signUpInformation,
  adminSignInInformation,
} = require("../../testData/testData.js");
require("dotenv").config({ path: "../../../../env/.env" });
const databaseUri = process.env.DB_URI_testingErrors_blockAccount;

const {
  signUp,
  blockAccount,
  signIn,
} = require("../../supertest/requestFunctions.js");

describe("Test admin user blocking an account errors", () => {
  beforeAll(() => {
    mongoose.set("strictQuery", true);
    mongoose.connect(databaseUri);
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  // test("Regular user can't perform the task", async () => {
  //   // given 1
  //   await signUp(signUpInformation);
  //   const signUpResponse = await signIn(signUpInformation);
  //   const jsonWebToken = signUpResponse.body.jsonWebToken;
  //   // given 2
  //   const anotherRegularUser = {
  //     email: "yhjyhj92@naver.com",
  //     password: "dsfsdfsf",
  //     name: "Yeshiva",
  //   };
  //   await signUp(anotherRegularUser);
  //   const emailToBlock = anotherRegularUser.email;
  //   // when
  //   const response = await blockAccount(jsonWebToken, emailToBlock);
  //   // expect
  //   expect(response.body.message).toBe(
  //     "Only Admin account can block other accounts"
  //   );
  // });

  test("Admin JWT won't work when admin email gets updated", async () => {
    // given 1: User sign up
    await signUp(signUpInformation);
    const emailToBlock = signUpInformation.email;

    // given 2: Admin sign up
    const adminSignInResponse = await signIn(adminSignInInformation);
    const adminJwt = adminSignInResponse.body.jsonWebToken;

    // given 3: Admin email gets updated
    process.env.ADMIN_EMAIL = "admin2@admin2";

    // when: block user with jwt issued by old admin email
    const response = await blockAccount(adminJwt, emailToBlock);

    // expect
    expect(response.body.message).toBe(
      "Please login with new admin email address."
    );

    // afterThis
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    process.env.ADMIN_EMAIL = "admin@admin";
  });
});
