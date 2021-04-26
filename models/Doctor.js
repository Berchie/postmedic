const mongoose = require("mongoose");
const Institution = require("./Institution");

const DocotrSchema = new mongoose.Schema(
  {
    name: {
      firstname: { type: String, require: true },
      lastname: { type: String, require: true },
    },
    email: { type: String, lowercase: true, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  },
  { autoIndex: false },
  { timestamps: true }
);

//middleware for remove deleted doctor's id from insitution
DocotrSchema.pre("remove", async function (next) {
  try {
    await Institution.findByIdAndUpdate(
      { _id: this.institution }, //this key word is used here to refer to the document or DoctorSchema
      { $pull: { doctors: this._id } }
    );
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Doctor", DocotrSchema);
