const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: {
      firstname: { type: String, require: true, trim: true },
      middlename: { type: String, default: "" },
      lastname: { type: String, require: true, trim: true },
    },
    age: { type: Number, require: true },
    gender: { type: String, trim: true, require: true, min: 3, max: 5 },
    hospitalId: { type: String, trim: true, require: true },
    address: { type: String },
    city: { type: String, trim: true, require: true },
    telephone: { type: String, trim: true, require: true },
    email: { type: String, lowercase: true, trim: true },
    instituition: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    admissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admission" }],
    riskFactor: { type: mongoose.Schema.Types.ObjectId, ref: "RiskFactor" },
    currentPregnancies: [{ type: mongoose.Schema.Types.ObjectId, ref: "CurrentPregnancy" }],
    obstetricHistory: { type: mongoose.Schema.Types.ObjectId, ref: "ObstetricHistory" },
  },
  { timestamps: true },
  { autoIndex: false }
);

module.exports = mongoose.model("Patient", PatientSchema);
