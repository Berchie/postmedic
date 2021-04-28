const mongoose = require("mongoose");
const Patient = require("./Patient");

const AdmissionSchema = new mongoose.Schema(
  {
    admissionDate: { require: true, type: Date },
    dischargedDate: { require: true, type: Date },
    durationOfStay: { type: Number },
    dischargedDiagnosis: { require: true, type: String },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  },
  { autoIndex: false },
  { timestamps: true }
);

AdmissionSchema.pre("remove", async function (next) {
  try {
    await Patient.update(
      { _id: this.patient },
      { $pull: { admissions: this._id } },
      { multi: true } //if reference exists in multiple documents
    ).exec(); 
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Admission", AdmissionSchema);
