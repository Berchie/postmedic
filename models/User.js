const mongoose = require("mongoose");
const Insitution = require("./Institution");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, min: 4, max: 100 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Doctor", "Normal"], required: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  },
  { timestamps: true },
  { autoIndex: false }
);

//middleware for remove deleted user's id from insitution
UserSchema.pre("remove", async function (next) {
  try {
    await Insitution.findByIdAndUpdate(
      { _id: this.institution }, //this key word is used here to refer to the document or DoctorSchema
      { $pull: { patients: this._id } }
    );
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model("User", UserSchema);
