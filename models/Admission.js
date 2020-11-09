const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  dateOfAdmission: { require: true, type: date },
  dateOfDischarge: { require: true, type: date },
  durationOfStay: { type: Number },
  dischargeDiagnosis: { require: true, type: String },
});

module.exports = mongoose.model("Admission", AdmissionSchema);
