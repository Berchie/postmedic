const mongoose = require('mongoose');

const CurrentPregnancySchema = new mongoose.Schema({
  edd: { type: Date },
  ega: { type: Number, default: 0 },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
},{ autoIndex: false }, {timestamps: true});

module.exports = mongoose.model("CurrentPregnancy", CurrentPregnancySchema);
