const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  dateOfAdmission: { require: true, type: Date },
  dateOfDischarged: { require: true, type: Date },
  durationOfStay: { type: Number},
  dischargedDiagnosis: { require: true, type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }
},{ autoIndex: false }, {timestamps: true});

module.exports = mongoose.model("Admission", AdmissionSchema);
