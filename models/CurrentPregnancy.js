const mongoose = require("mongoose");
const Patient = require("./Patient");

const CurrentPregnancySchema = new mongoose.Schema(
  {
    edd: { type: Date },
    ega: { type: Number, default: 0 },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  },
  { autoIndex: false },
  { timestamps: true }
);

CurrentPregnancySchema.pre("remove", async function (next) {
  try {
    await Patient.findByIdAndUpdate(
      { _id: this.patient },
      { $pull: { currentPregnancies: this._id } },
      { multi: true }
    );
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("CurrentPregnancy", CurrentPregnancySchema);
