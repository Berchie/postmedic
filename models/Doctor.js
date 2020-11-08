const mongoose = require('mongoose');

const DocotrSchema = new mongoose.Schema({
  id: Number,
  name: {
    firstname:{type: String, require:true},
    lastname: {type:String, require:true}
  },
  email:{type:String, lowercase: true, trim:true, required:true},
  phone: {type:String, trim:true, required: true},
  institution: {type: mongoose.Schema.Types.ObjectId, ref: "Institution"}
})


module.exports = mongoose.model("Doctor", DocotrSchema);