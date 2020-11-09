const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  DateOfAppointment: { type: Date, require: true },
  Status: { type: String, enum: ["Pending", "Attended"] },
  DateOfArrival: { type: Date },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
