const mongoose = require('mongoose');


const ObstetricHistorySchema = new mongoose.Schema({
  numberOfPregnancies: {type:Number, default:0},
  numberOfBirth: {type:Number, default:0},
  numberOfAbortionSpontaneous: {type:Number, default:0},
  numberOfAbortionInduced: {type:Number, default:0},  
});


module.exports = mongoose.model("ObstetricHistory", ObstetricHistorySchema);