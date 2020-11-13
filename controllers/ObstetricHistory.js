const ObHistoryRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const ObstetericHistory = require("../models/ObstetricHistory");
const Patient = require("../models/Patient");

ObHistoryRouter.get("/", async (req, res) => {
  try {
    const data = await ObstetericHistory.find({ patient: req.body.id }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

ObHistoryRouter.post("/", async (req, res) => {
  const patient = Patient.findOne({ _id: req.body.patientId });

  const obstetricHistory = new ObstetericHistory({
    numberOfPregnancies: req.body.pregnancy,
    numberOfBirth: req.body.birth,
    numberOfAbortionSpontaneous: req.body.spontaneous,
    numberOfAbortionInduced: req.body.induced,
    patient: patient._id
  });

  try {
    const savedObstetricHisotry = await obstetricHistory.save();
    res.status(201).json({ message: "Record saved." });
    patient.obstetricHistory = savedObstetricHisotry._id;
    patient.save();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

ObHistoryRouter.put("/:id", async (req, res) => {
  try {
    const updateOB = await ObstetericHistory.findByIdAndUpdate(req.params.id, {
      $set: {
        numberOfPregnancies: req.body.pregnancy,
        numberOfBirth: req.body.birth,
        numberOfAbortionSpontaneous: req.body.spontaneous,
        numberOfAbortionInduced: req.body.induced,
      },
    });
    res.status(202).json({ message: "Record save." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

ObHistoryRouter.delete("/:id", async (req, res) => {
  try {
    const deleteObHist = await ObstetericHistory.findByIdAndDelete(req.params.id);
    res.status(204).json({message: "Record deleted."});
    await Patient.obstetricHistory.id(req.params.id).remove();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = ObHistoryRouter;
