const appointmentRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");
const Paitent = require("../models/Patient");

appointmentRouter.get("/", async (req, res) => {
  try {
    const data = await Appointment.find({ patient: req.body.patid }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

appointmentRouter.post(
  "/",
  [body("appointmentDate", "Appointment Date field cannot be empty.").not().isEmpty()],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // logger.error(res.send({ error: errors.array() }));
      return res.status(400).json({ errors: errors.array() });
    }

    const patient = Paitent.findOne({ _id: req.body.patientId });

    const appointment = new Appointment({
      DateOfAppointment: req.body.appointmentDate,
      Status: req.body.status,
      DateOfArrival: req.body.arrivalDate,
      patient: patient._id,
    });

    try {
      const savedAppointment = await appointment.save();
      res.status(201).json({ message: "Record saved." });
      patient.appointment.push(savedAppointment._id);
      patient.save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
);

appointmentRouter.put("/:id", async (req, res) => {
  try {
    const updateAppoinment = await Appointment.findByIdAndUpdate(req.params.id, {
      $set: {
        DateOfAppointment: req.body.appointmentDate,
        Status: req.body.status,
        DateOfArrival: req.body.arrivalDate,
      },
    });
    res.status(202).json({ message: "Record save." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

appointmentRouter.delete("/:id", async (req, res) => {
  try {
    const patient = await Paitent.find({ currentPregnancies: req.params.id });

    const patApId = req.params.id;
    const deletedAppointment = await Paitent.findByIdAndRemove(req.params.id);
    res.status(203).json({ message: "Record deleted." });

    //remove the object id reference from the patient collection
    var index = patient.appointments.indexOf(patApId);
    if (index > -1) {
      patient.appointments.splice(index, 1);
    }
    patient.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = appointmentRouter;
