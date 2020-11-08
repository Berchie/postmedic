const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  DateOfAppointment: { type: Date, require: true },
  Status: { enum: ["Pending", "Attended"] },
  DateOfArrival: { type: Date },
  doctor: {},
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
