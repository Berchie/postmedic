const mongoose = require("mongoose");

const DocotrSchema = new mongoose.Schema({
  name: {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
  },
  email: { type: String, lowercase: true, trim: true, required: true },
  phone: { type: String, trim: true, required: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
}, { autoIndex: false }, {timestamps: true});

module.exports = mongoose.model("Doctor", DocotrSchema);
