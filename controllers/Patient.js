const patientRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");
const Institution = require("../models/Institution");
const ObstetricHistory = require("../models/ObstetricHistory");
const Appointment = require("../models/Appointment");
const Admission = require("../models/Admission");
const RiskFactor = require("../models/RiskFactor");
const CurrentPregnancy = require("../models/CurrentPregnancy");
const {format} = require('date-fns');

let patientId = null;
const dateFromat = 'YYYY-MM-DD';

patientRouter.get("/", async (req, res) => {
  res.send("Populating Patien related records.");
  try {
    const allPatient = await Patient.find().populate(req.query.instId);
    res.status(200).json(allPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

patientRouter.get("/:id", async (req, res) => {
  // res.send(" populating Patient related records.")
  try {
    const patient = await Patient.findById(req.params.id).populate('obstetricHistory').populate('currentPregnancies')
    .populate('riskFactor').populate('admissions').populate('appointments');
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

patientRouter.post(
  "/newpatient",
  [
    body("firstname", "firstname name field cannot be empty.").not().isEmpty(),
    body("firstname", "First name must be between 2-150 characters long.").isLength({
      min: 2,
      max: 150,
    }),
    body("lastname", "Last name field cannot be empty.").not().isEmpty(),
    body("latname", "Last name must be between 2-150 characters long.").isLength({
      min: 2,
      max: 150,
    }),
    body("age", "Age field cannot be empty").not().isEmpty(),
    body("age", "Age must be between 1-999 characters long.").isLength({ min: 1, max: 999 }),
    body("gender", "Gender field cannot be empty.").not().isEmpty(),
    body("hospitalId", "Hospital Id field cannot be empty.").not().isEmpty(),
    body("city", "City field cannot be empty.").not().isEmpty(),
    body("phone", "Phone must be at least 10 characters long.").isLength({ min: 10 }),
    body("email", "The email you entered is invalid, please try again.").isEmail(),
    body(
      "email",
      "Email address must be between 4-100 characters long, please try again."
    ).isLength({ min: 7, max: 100 }),
    body("appointmentDate", "Appointment Date field cannot be empty.").not().isEmpty(),
    body("admissionDate", "Admission Date field cannot be empty.").not().isEmpty(),
    body("dischargedDate", "Discharged Date field cannot be empty.").not().isEmpty(),
    body("dischargedDiagnosis", "Discharged Diagnosis field cannot be empty.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const institution = await Institution.findOne({ name: req.body.institutionId }).exec();

    const patient = new Patient({
      name: {
        firstname: req.body.data.firstname,
        middlename: req.body.data.middlename,
        lastname: req.body.data.lastname,
      },
      age: parseInt(req.body.data.age),
      gender: req.body.data.gender,
      hospitalId: req.body.data.hospitalId,
      address: req.body.data.address,
      city: req.body.data.city,
      telephone: req.body.data.phone,
      email: req.body.data.email,
      instituition: patient._id,
    });

    try {
      const savePatient = await patient.save();
      res.status(201).json({ message: "Record saved." });
      patientId= savePatient._id;
      institution.patients.push(patientId);
      institution.save();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    //create admission document
    const admission = new Admission({
      dateOfAdmission: format(req.body.data.admissionDate,dateFromat),
      dateOfDischarged: format(req.body.data.dischargedDate,dateFromat),
      durationOfStay: parseInt(req.body.data.numberOfDays),
      dischargedDiagnosis: req.body.data.dischargedDiagnosis,
      patient: patientId,
    });
    try {
      const savedAdmission = await admission.save();
      res.status(201).json({ message: "Record saved." });
      patient.Admission.push(savedAdmission._id);
      patient.save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
    
    //create appointment document
    const appointment = new Appointment({
      DateOfAppointment: format(req.body.data.appointmentDate,dateFromat),
      // Status: req.body.status,
      // DateOfArrival: req.body.data.arrivalDate,
      patient: patientId,
    });

    try {
      const savedAppointment = await appointment.save();
      res.status(201).json({ message: "Record saved." });
      patient.appointment.push(savedAppointment._id);
      patient.save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }

    //create Obstetric History document
    const obstetricHistory = new ObstetricHistory({
      numberOfPregnancies: parseInt(req.body.data.pregnancy),
      numberOfBirth: parseInt(req.body.data.birth),
      numberOfAbortionSpontaneous: parseInt(req.body.data.spontaneous),
      numberOfAbortionInduced: parseInt(req.body.data.induced),
      patient: patientId
    });
  
    try {
      const savedObstetricHisotry = await obstetricHistory.save();
      res.status(201).json({ message: "Record saved." });
      patient.obstetricHistory = savedObstetricHisotry._id;
      patient.save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }

    //create current pregnancy
    const currentPragnancy = new CurrentPregnancy({
      edd: format(req.body.data.edd, dateFromat),
      ega: parseInt(req.body.data.ega),
      patient: patient._id,
    });
  
    try {
      const savedCurrentPreg = await currentPragnancy.save();
      res.status(201).json({ message: "Record saved." });
      patient.currentPragnancy.push(savedCurrentPreg._id);
      (await patient).save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }

    //create Risk Factor document
    const riskFactor = new RiskFactor({
      hypertension: req.body.data.hypertension,
      heartDisease: req.body.data.heartDisease,
      sickleCellDisease: req.body.data.sickleCellDisease,
      diabetes: req.body.data.diabetes,
      epilepsy: req.body.data.epilepsy,
      asthma: req.body.data.asthma,
      tb: req.body.data.tb,
      respiratoryDisease: req.body.data.respiratoryDisease,
      mentalIllness: req.body.data.mentalIllness,
      scd: req.body.data.scd,
      other: req.body.data.other,
      otherSpecify: req.body.data.otherSpecify,
      previousSurgery: req.body.data.previousSurgery,
      patient: patientId,
    });
  
    try {
      const savedriskFactor = await riskFactor.save();
      res.status(201).json({ message: "Record saved." });
      patient.riskFactor = savedriskFactor._id;
      patient.save();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }

  }
);

patientRouter.post(
  "/patient",
  [
    body("firstname", "firstname name field cannot be empty.").not().isEmpty(),
    body("firstname", "First name must be between 4-150 characters long.").isLength({
      min: 4,
      max: 150,
    }),
    body("lastname", "Last name field cannot be empty.").not().isEmpty(),
    body("latname", "Last name must be between 4-150 characters long.").isLength({
      min: 4,
      max: 150,
    }),
    body("age", "Age field cannot be empty").not().isEmpty(),
    body("age", "Age must be between 1-999 characters long.").isLength({ min: 1, max: 999 }),
    body("gender", "Gender field cannot be empty.").not().isEmpty(),
    body("hospitalId", "Hospital Id field cannot be empty.").not().isEmpty(),
    body("city", "City field cannot be empty.").not().isEmpty(),
    body("phone", "Phone must be at least 10 characters long.").isLength({ min: 10 }),
    body("email", "The email you entered is invalid, please try again.").isEmail(),
    body(
      "email",
      "Email address must be between 4-100 characters long, please try again."
    ).isLength({ min: 7, max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const institution = await Institution.findOne({ name: req.body.institutionId }).exec();

    const patient = new Patient({
      name: {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
      },
      age: parseInt(req.body.age),
      gender: req.body.gender,
      hospitalId: req.body.hospitalId,
      address: req.body.address,
      city: req.body.city,
      telephone: req.body.phone,
      email: req.body.email,
      instituition: patient._id,
    });

    try {
      const savePatient = await patient.save();
      res.status(201).json({ message: "Record saved." });
      institution.patients.push(savePatient._id);
      institution.save();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

patientRouter.put(
  "/:id",
  [
    body("firstname", "firstname name field cannot be empty.").not().isEmpty(),
    body("firstname", "First name must be between 4-150 characters long.").isLength({
      min: 4,
      max: 150,
    }),
    body("lastname", "Last name field cannot be empty.").not().isEmpty(),
    body("latname", "Last name must be between 4-150 characters long.").isLength({
      min: 4,
      max: 150,
    }),
    body("age", "Age field cannot be empty").not().isEmpty(),
    body("age", "Age must be between 1-999 characters long.").isLength({ min: 1, max: 999 }),
    body("gender", "Gender field cannot be empty.").not().isEmpty(),
    body("hospitalId", "Hospital Id field cannot be empty.").not().isEmpty(),
    body("city", "City field cannot be empty.").not().isEmpty(),
    body("phone", "Phone must be at least 10 characters long.").isLength({ min: 10 }),
    body("email", "The email you entered is invalid, please try again.").isEmail(),
    body(
      "email",
      "Email address must be between 4-100 characters long, please try again."
    ).isLength({ min: 7, max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedPatient = await Patient.findByIdAndUpdate(require.params.id, {
        $set: {
          name: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
          },
          age: parseInt(req.body.age),
          gender: req.body.gender,
          hospitalId: req.body.hospitalId,
          address: req.body.address,
          city: req.body.city,
          telephone: req.body.phone,
          email: req.body.email,
        },
      });
      res.status(200).send("Record Saved");
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

patientRouter.delete("/:id", async (req, res) => {
  try {

    const institution = await Patient.find().populate(req.params.id);

    const delPatId = req.params.id;

    const deletedPatient =  await Patient.findByIdAndDelete(req.params.id);
    res.status(204).send("Record deleted.");

    // remove paitent from institution collection
    var index = institution.patients.indexOf(delPatId);
    if (index > -1) {
      institution.patients.splice(index,1);
    }
    institution.save();

  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = patientRouter;
