const patientRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");
const Institution = require("../models/Institution");
const ObstetricHistory = require("../models/ObstetricHistory");
const Appointment = require("../models/Appointment");
const Admission = require("../models/Admission");
const RiskFactor = require("../models/RiskFactor");
const CurrentPregnancy = require("../models/CurrentPregnancy");

let patientId = null;


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
      patientId= savePatient._id;
      institution.patients.push(patientId);
      institution.save();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    //create admission document
    const admission = new Admission({
      dateOfAdmission: req.body.admissionDate,
      dateOfDischarged: req.body.dischargedDate,
      durationOfStay: parseInt(req.body.numberOfDays),
      dischargedDiagnosis: req.body.dischargedDiagnosis,
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
      DateOfAppointment: req.body.appointmentDate,
      Status: req.body.status,
      DateOfArrival: req.body.arrivalDate,
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
    const obstetricHistory = new ObstetericHistory({
      numberOfPregnancies: parseInt(req.body.pregnancy),
      numberOfBirth: parseInt(req.body.birth),
      numberOfAbortionSpontaneous: parseInt(req.body.spontaneous),
      numberOfAbortionInduced: parseInt(req.body.induced),
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
      edd: parseInt(req.body.edd),
      ega: parseInt(req.body.ega),
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
      hypertension: req.body.hypertension,
      heartDisease: req.body.heartDisease,
      sickleCellDisease: req.body.sickleCellDisease,
      diabetes: req.body.diabetes,
      epilepsy: req.body.epilepsy,
      asthma: req.body.asthma,
      tb: req.body.tb,
      respiratoryDisease: req.body.respiratoryDisease,
      mentalIllness: req.body.mentalIllness,
      scd: req.body.scd,
      other: req.body.other,
      otherSpecify: req.body.otherSpecify,
      previousSurgery: req.body.previousSurgery,
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
