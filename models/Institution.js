const mongoose = require("mongoose");
const Doctor = require("./Doctor");
const Patient = require("./Patient");
const User = require("./User");

const InstitutionSchema = new mongoose.Schema(
  {
    institution: {
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
    telephone: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { autoIndex: false }
);

InstitutionSchema.pre("remove", async function (next) {
  try {
    await Patient.deleteMany({ _id: { $in: this.patients } });
    await Doctor.deleteMany({ _id: { $in: this.doctors } });
    await User.deleteMany({ _id: { $in: this.users } });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Institution", InstitutionSchema);
