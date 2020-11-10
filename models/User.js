const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true, min: 8, max: 50 },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  },
  { autoIndex: false }
);

module.exports = mongoose.model("User", UserSchema);
