const mongoose = require("mongoose");

const ObstetricHistorySchema = new mongoose.Schema({
  numberOfPregnancies: { type: Number, min: 0, default: 0 },
  numberOfBirth: { type: Number, min: 0, default: 0 },
  numberOfAbortionSpontaneous: { type: Number, min: 0, default: 0 },
  numberOfAbortionInduced: { type: Number, min: 0, default: 0 },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
},{ autoIndex: false }, {timestamps: true});

module.exports = mongoose.model("ObstetricHistory", ObstetricHistorySchema);
