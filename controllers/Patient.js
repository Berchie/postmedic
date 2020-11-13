const patientRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");

patientRouter.get('/', async(req, res)=>{
  res.send("Populating Patien related records.")
});

patientRouter.post('/newpatient', async(req, res)=>{

});

patientRouter.put('/:id', async(req, res)=>{

});

patientRouter.delete('/:id', async(req, res)=>{

});

module.exports= patientRouter;