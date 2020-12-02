const CurrentPregRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const CurrentPragnancy = require("../models/CurrentPregnancy");
const Paitent = require("../models/Patient");

CurrentPregRouter.get("/", async (req, res) => {
  try {
    const data = await CurrentPragnancy.find({ patient: req.body.id }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

CurrentPregRouter.post("/", async (req, res) => {
  const patient = Paitent.findOne({ _id: req.body.patientId });

  const currentPragnancy = new CurrentPragnancy({
    edd: req.body.edd,
    ega: req.body.ega,
    patient: patient._id,
  });

  try {
    const savedCurrentPreg = await currentPragnancy.save();
    res.status(201).json({ message: "Record saved." });
    patient.currentPragnancy.push(savedCurrentPreg._id);
    (await patient).save();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

CurrentPregRouter.put("/:id", async (req, res) => {
  try {
    const updateCP = await CurrentPragnancy.findByIdAndUpdate(req.params.id, {
      $set: {
        edd: req.body.edd,
        ega: req.body.ega,
      },
    });
    res.status(202).json({ message: "Record save." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

CurrentPregRouter.delete("/:id", async (req, res) => {
  try {
    const patient = await Paitent.find({ currentPregnancies: req.params.id });

    const patCPId = req.params.id;
    const deletedCuurentPreg = await Paitent.findByIdAndRemove(req.params.id);
    res.status(203).json({ message: "Record deleted." });

    //remove the object id reference from the patient collection
    var index = patient.currentPregnancies.indexOf(patCPId);
    if (index > -1) {
      patient.currentPregnancies.splice(index, 1);
    }
    patient.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = CurrentPregRouter;
