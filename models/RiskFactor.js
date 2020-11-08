const mongoose = require('mongoose');

const RiskFactorSchema = new mongoose.Schema({
  hypertension: { type: String, min: 2, max: 3 },
  heartDisease: { type: String, min: 2, max: 3 },
  sickleCellDisease: { type: String, min: 2, max: 3 },
  diabetes: { type: String, min: 2, max: 3 },
  epilepsy: { type: String, min: 2, max: 3 },
  asthma: { type: String, min: 2, max: 3 },
  tb: { type: String, min: 2, max: 3 },
  respiratoryDisease: { type: String, min: 2, max: 3 },
  mentalIllness: { type: String, min: 2, max: 3 },
  scd: { type: String, min: 2, max: 3 },
  other: { type: String, min: 2, max: 3 },
  otherSpecify: { type: String, default: "" },
  PreviousSurgery: { type: String },
});

module.exports = mongoose.model("RiskFactor", RiskFactorSchema);
