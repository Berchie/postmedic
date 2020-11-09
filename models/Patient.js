const mongoose = require('mongoose');


const PatientSchema = new mongoose.Schema(
  {
    name: {
      firstname: { type: String, require: true, trim: true },
      middlename: { type: String },
      lastname: { type: String, require: true, trim: true },
    },
    age: { type: Number, require: true },
    gender: { type: String, trim: true, require: true, min: 3, max: 5 },
    hospitalId: { type: String, trim: true, require: true },
    address: { type: String },
    city: { type: String, trim: true, require: true },
    telephone: { type: String, trim: true, require: true },
    email: { type: String, lowercase: true, trim: true, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    instituition: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    appointment:[{type: mongoose.Schema.Types.ObjectId, ref:'Appointment'}],
    admission:[{type: mongoose.Schema.Types.ObjectId, ref:'Admission'}],
    riskFactor:{type: mongoose.Schema.Types.ObjectId, ref:'RiskFactor'},
    currentPregnancy:[{type: mongoose.Schema.Types.ObjectId, ref:'CurrentPregnancy'}],
    obstetricHistory:{type:mongoose.Schema.Types.ObjectId, ref:'ObstetricHistory'},
    
  },
  { autoIndex: false }
);


module.exports = mongoose.model("Patients", PatientSchema);