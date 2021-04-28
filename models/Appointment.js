const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  appointmentDate: { type: Date, require: true },
  Status: { type: String, enum: ["Pending", "Attended"] },
  arrivalDate: { type: Date },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }
}, { autoIndex: false }, {timestamps: true});

AppointmentSchema.pre('remove', async function(next) {
  await Patient.update(
      { _id : this.patient}, 
      { $pull: { appointments: this._id } },
      { multi: true })  //if reference exists in multiple documents 
  .exec();
  next();
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
