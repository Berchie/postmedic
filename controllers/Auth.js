const authRouter = require('express').Router();
const Institution = require('../models/Institution');
const User = require('../models/User');

let initialInstID = null;

authRouter.post('/signup', async(req, res)=>{

  //create new sign up
  const institution = new Institution({
    _id: new Date().getTime,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    telephone: req.body.telephone
  });

  try {
    const saveInstitute =  await institution.save();
    res.json(saveInstitute);
    initialInstID = saveInstitute._id;
  } catch (err) {
    res.json({message: err.message});
  }

  //create default admin user for an institution
  const defaultUser = new User({
    _id: new Date.getTime(),
    name: req.body.fullname,
    username: req.body.username,
    passwordHash: passwordHash,
    institution: initialInstID
  }) 
})