const riskFactorRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const RiskFactor = require("../models/RiskFactor");
const Paitent = require("../models/Patient");
const { nextDay } = require("date-fns");

riskFactorRouter.get("/", async (req, res) => {
  try {
    const data = await RiskFactor.find({ patient: req.body.id }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

riskFactorRouter.post("/", async (req, res) => {
  const patient = Paitent.findOne({ _id: req.body.patientId });

  const riskFactor = new RiskFactor({
    hypertension: req.body.hypertension,
    heartDisease: req.body.heartDisease,
    sickleCellDisease: req.body.sickleCellDisease,
    diabetes: req.body.diabetes,
    epilepsy: req.body.epilepsy,
    asthma: req.body.asthma,
    tb: req.body.tb,
    respiratoryDisease: req.body.respiratoryDisease,
    mentalIllness: req.body.mentalIllness,
    scd: req.body.scd,
    other: req.body.other,
    otherSpecify: req.body.otherSpecify,
    previousSurgery: req.body.previousSurgery,
    patient: patient._id,
  });

  try {
    const savedriskFactor = await riskFactor.save();
    res.status(201).json({ message: "Record saved." });
    patient.riskFactor = savedriskFactor._id;
    patient.save();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

riskFactorRouter.put("/:id", async (req, res) => {
  try {
    const updateRF = await RiskFactor.findByIdAndUpdate(req.params.id, {
      $set: {
        hypertension: req.body.hypertension,
        heartDisease: req.body.heartDisease,
        sickleCellDisease: req.body.sickleCellDisease,
        diabetes: req.body.diabetes,
        epilepsy: req.body.epilepsy,
        asthma: req.body.asthma,
        tb: req.body.tb,
        respiratoryDisease: req.body.respiratoryDisease,
        mentalIllness: req.body.mentalIllness,
        scd: req.body.scd,
        other: req.body.other,
        otherSpecify: req.body.otherSpecify,
        previousSurgery: req.body.previousSurgery,
        patient: patient._id,
      },
    });
    res.status(202).json({ message: "Record save." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

riskFactorRouter.delete("/:id", async (req, res) => {
  
  RiskFactor.findById(req.params.id, async function (err, riskFactor) {
    if (err) {
      return next(err);
    }
    await riskFactor.remove();
    return res.json({ error: err.message });
  });


});

module.exports = riskFactorRouter;
