const admissionRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Admission = require("../models/Admission");
const Paitent = require("../models/Patient");

admissionRouter.get("/", async (req, res) => {
  try {
    const data = await Admission.find({ patient: req.body.patid }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

admissionRouter.post(
  "/",
  [
    body("admissionDate", "Admission Date field cannot be empty.").not().isEmpty(),
    body("dischargedDate", "Discharged Date field cannot be empty.").not().isEmpty(),
    body("dischargedDiagnosis", "Discharged Diagnosis field cannot be empty.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // logger.error(res.send({ error: errors.array() }));
      return res.status(400).json({ errors: errors.array() });
    }

    const patient = Paitent.findOne({ _id: req.body.patientId });

    const admission = new Admission({
      dateOfAdmission: req.body.admissionDate,
      dateOfDischarged: req.body.dischargedDate,
      durationOfStay: parseInt(req.body.numberOfDays),
      dischargedDiagnosis: req.body.dischargedDiagnosis,
      patient: patient._id,
    });

    try {
      const savedAdmission = await Admission.save();
      res.status(201).json({ message: "Record saved." });
      patient.Admission.push(savedAdmission._id);
      patient.save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
);

admissionRouter.put("/:id", async (req, res) => {
  try {
    const updateAdmission = await Admission.findByIdAndUpdate(req.params.id, {
      $set: {
        DateOfAdmission: req.body.AdmissionDate,
        dateOfDischarged: req.body.dischargedDate,
        durationOfStay: parseInt(req.body.numberOfDays),
        dischargedDiagnosis: req.body.dischargedDiagnosis,
      },
    });
    res.status(202).json({ message: "Record save." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

admissionRouter.delete("/:id", async (req, res) => {
  try {
    const patient = await Paitent.find({ admissions: req.params.id });

    const patAdId = req.params.id;
    const deletedAddmission = await Admission.findByIdAndRemove(req.params.id);
    res.status(203).json({ message: "Record deleted." });

    //remove the object id reference from the patient collection
    var index = patient.admissions.indexOf(patAdId);
    if (index > -1) {
      patient.admissions.splice(index, 1);
    }
    patient.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = admissionRouter;
