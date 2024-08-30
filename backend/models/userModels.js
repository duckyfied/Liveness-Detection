const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  aadhar: {
    type: Number,
    unique: true,
    required: true,
  },
  encoding: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
