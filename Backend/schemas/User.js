const mongoose = require("mongoose");

const Address = mongoose.Schema(
  {
    city: { type: String },
    region: { type: String },
    country: { type: String },
    zip: { type: String },
  },
  { timestamps: true }
);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Address,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
