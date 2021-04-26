const doctorRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Doctor = require("../models/Doctor");
const Institution = require("../models/Institution");

let doctorId = null;

//get the list of doctors
doctorRouter.get("/", async (req, res) => {
  try {
    const data = await Doctor.find({ institution: req.body.id }).exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//get the specific doctors by id
doctorRouter.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).exec();
    res.json(doctor);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//create or add doctor
doctorRouter.post("/newdoctor", [], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Doctor.find({
  //   email: req.body.email
  // }).then((user) => {
  //   if (user) {
  //     return res.status(400).json({ name: "Name already exists" });
  //   }
  // });
  const userE = await Doctor.find({
    "name.firstname": req.body.firstname,
    "name.lastname": req.body.lastname,
  });
  console.log(userE);
  if (userE.length > 0) {
    return res.status(400).json({ name: "Name already exists" });
  }

  const institution = await Institution.findById({ _id: req.body.institutionId });

  const doctor = new Doctor({
    name: { firstname: req.body.firstname, lastname: req.body.lastname },
    email: req.body.email,
    phone: req.body.phone,
    institution: institution._id,
  });

  try {
    const saveDoctor = await doctor.save();
    res.status(201).json({ message: "Docotr added successfully" });
    doctorId = saveDoctor._id;
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  try {
    institution.doctors.push(doctorId);
    institution.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//update doctor info
doctorRouter.put("/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "name.firstname": req.body.firtname,
          "name.lastname": req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    );
    res.status(202).json({ message: "Record Updated." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//delete doctor
doctorRouter.delete("/:id", async (req, res) => {
  const instDoctorId = req.params.id;

  Doctor.findById(instDoctorId, function (err, doctor) {
    if (err) {
      return next(err);
    }
    doctor.remove();
    res.status(202).json({ message: "Doctor deleted successfully." });
  });
});

module.exports = doctorRouter;
