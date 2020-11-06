const mongoose = require('mongoose');

const institution = new mongoose.Schema({
  id: Number,
  name: {
    require: true, 
    type: String},
  address: {
    require:true, 
    type:string},
  city: {
    require: true, 
    type: string},
  telephone: string
})