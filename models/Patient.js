const mongoose = require("mongoose");
const ObHistoryRouter = require("../controllers/ObstetricHistory");
const logger = require("../utils/logger");
const Admission = require("./Admission");
const Appointment = require("./Appointment");
const CurrentPregnancy = require("./CurrentPregnancy");
const RiskFactor = require("./RiskFactor");
const Insitution = require("./Institution");

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

PatientSchema.pre("remove", async (next) => {
  try {
    await Insitution.findByIdAndUpdate(
      { _id: this.institution }, //this key word is used here to refer to the document or DoctorSchema
      { $pull: { patients: this._id } }
    );
    await ObHistoryRouter.remove({ patient: this._id }).exec();
    await RiskFactor.remove({ patient: this._id }).exec();
    await CurrentPregnancy.remove({ _id: { $in: this._id } }).exec();
    await Admission.remove({ _id: { $in: this._id } }).exec();
    await Appointment.remove({ _id: { $in: this._id } }).exec();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Patient", PatientSchema);
