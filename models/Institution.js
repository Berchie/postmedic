const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    telephone: string,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctors" }],
    patient: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { autoIndex: false }
);

module.exports = mongoose.model("Institution", InstitutionSchema);
