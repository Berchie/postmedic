const mongoose = require("mongoose");
const Patient = require("./Patient");

const AdmissionSchema = new mongoose.Schema({
  dateOfAdmission: { require: true, type: Date },
  dateOfDischarged: { require: true, type: Date },
  durationOfStay: { type: Number},
  dischargedDiagnosis: { require: true, type: String },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }
},{ autoIndex: false }, {timestamps: true});

AdmissionSchema.pre('remove', function(next) {
  Patient.update(
      { admissions : this._id}, 
      { $pull: { admissions: this._id } },
      { multi: true })  //if reference exists in multiple documents 
  .exec();
  next();
});

module.exports = mongoose.model("Admission", AdmissionSchema);
