const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    require: true,
    trim: true
  },
  address: {
    type: String,
    require: true,
    
  },
  city: {
    type: String,
    require: true,
    
  },
  telephone: string,
  users : [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  doctors: [{type: mongoose.Schema.Types.ObjectId, ref:'Doctors'}]
},{autoIndex: false});

module.exports = mongoose.model("Institution", InstitutionSchema);
