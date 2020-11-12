const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, min: 4, max: 100 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true},
    role: { type: String, enum: ["Admin", "Doctor", "Normal"], required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  }, { autoIndex: false }
);


module.exports = mongoose.model("User", UserSchema);
