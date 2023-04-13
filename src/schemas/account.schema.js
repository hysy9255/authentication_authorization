const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean },
  isBlocked: { type: Boolean },
  profileImage: { type: String, default: "someImage.jpg" },
  descriptions: { type: String },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = { accountSchema };
