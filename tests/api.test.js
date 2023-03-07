const mongoose = require("mongoose");
const userDao = require("./../src/models/user.dao.js");

const supertest = require("./supertest/supertest.js");

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.DATABASE_URI);
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
  await mongoose.connection.close();
});

test("regular user signing up", async () => {
  // given
  const user = {
    name: "윤형준",
    email: "hysy9255@gmail.com",
    password: "dbsgudwns",
  };
  // when
  const response = await supertest.signUp(user.name, user.email, user.password);
  // expect
  expect(response.body.data.name).toBe(user.name);
});

let token;
test("regular user siging in", async () => {
  // given
  const user = {
    name: "윤형준",
    email: "hysy9255@gmail.com",
    password: "dbsgudwns",
  };
  // when
  const response = await supertest.signIn(user.email, user.password);
  token = response.body.token;
  // expect
  expect(response.body.data.email).toBe(user.email);
});

test("regular user updating password", async () => {
  // given
  const user = {
    name: "윤형준",
    email: "hysy9255@gmail.com",
    password: "dbsgudwns",
    newPassword: "dbsgudwns2",
  };
  // when
  const response = await supertest.updatePassword(
    token,
    user.password,
    user.newPassword
  );
  // expect
  expect(response.body.message).toBe("Successfully updated the password!");
});

test("regular user deleting account", async () => {
  // given
  const user = {
    name: "윤형준",
    email: "hysy9255@gmail.com",
    password: "dbsgudwns2",
  };
  // when
  const response = await supertest.deleteAccount(token, user.password);
  // expect
  expect(response.body.message).toBe("Successfully deleted the account!");
});

test("admin user blocking account", async () => {
  // given
  const admin = {
    name: "김나리",
    email: "admin@gmail.com",
    password: "adminPassword",
  };
  await userDao.createAdmin(admin.name, admin.email, admin.password);
  const adminSignIn = await supertest.signIn(admin.email, admin.password);
  const adminToken = adminSignIn.body.token;
  const user = {
    name: "윤형준",
    email: "hysy9255@gmail.com",
    password: "dbsgudwns2",
  };
  await supertest.signUp(user.name, user.email, user.password);
  // when
  const response = await supertest.blockAccount(
    adminToken,
    admin.password,
    user.email
  );
  // expect
  expect(response.body.blockedUser.name).toBe(user.name);
  expect(response.body.blockedUser.isBlocked).toBe(true);
});
