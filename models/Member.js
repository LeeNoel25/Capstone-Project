const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "member",
    enum: ["member", "admin"],
  },
});

module.exports = mongoose.model("Member", memberSchema);
