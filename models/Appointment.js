const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  DateOfAppointment: { type: Date, require: true },
  Status: { type: String, enum: ["Pending", "Attended"] },
  DateOfArrival: { type: Date },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }
}, { autoIndex: false }, {timestamps: true});

AppointmentSchema.pre('remove', function(next) {
  Patient.update(
      { appointments : this._id}, 
      { $pull: { appointments: this._id } },
      { multi: true })  //if reference exists in multiple documents 
  .exec();
  next();
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
