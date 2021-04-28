const patientRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");
const Institution = require("../models/Institution");
const ObstetricHistory = require("../models/ObstetricHistory");
const Appointment = require("../models/Appointment");
const Admission = require("../models/Admission");
const RiskFactor = require("../models/RiskFactor");
const CurrentPregnancy = require("../models/CurrentPregnancy");
const { format, parse } = require("date-fns");



let patientId = null;
const dateFromat = "yyyy-MM-dd";

patientRouter.get("/", async (req, res) => {
  // Populating Patient records.
  try {
    const allPatient = await Patient.find().populate(req.query.instId);
    return res.status(200).json(allPatient);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

patientRouter.get("/:id", async (req, res) => {
  // populating Patient related records.
    try {
    const patient = await Patient.findById(req.params.id)
      .populate("obstetricHistory")
      .populate("currentPregnancies")
      .populate("riskFactor")
      .populate("admissions")
      .populate("appointments");
      return res.status(200).json(patient);
  } catch (err) {
    return res.status(400).json({ error: err.message });
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
    body("lastname", "Last name must be between 2-150 characters long.").isLength({
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
      return res.status(400).json({ errors: errors.array() });
    }

    const institution = await Institution.findById({ _id: req.body.institutionId }).exec();
    console.log(institution);

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
      phone: req.body.phone,
      email: req.body.email,
      institution: institution._id,
    });

    try {
      const savePatient = await patient.save();
      // res.status(201).json({ message: "Record saved." });
      patientId = savePatient._id;
      institution.patients.push(patientId);
      await institution.save();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    console.log(format(parse(req.body.dischargedDate,'dd-MM-yyyy', new Date()), dateFromat));

    //create admission document
    const admission = new Admission({
      admissionDate: format(parse(req.body.admissionDate,'dd-MM-yyyy', new Date()), dateFromat),
      dischargedDate: format(parse(req.body.dischargedDate,'dd-MM-yyyy', new Date()), dateFromat),
      durationOfStay: parseInt(req.body.durationOfStay),
      dischargedDiagnosis: req.body.dischargedDiagnosis,
      patient: patientId,
    });
    try {
      const savedAdmission = await admission.save();
      // res.status(201).json({ message: "Record saved." });
      patient.admissions.push(savedAdmission._id);
      await patient.save();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }

    //create appointment document
    const appointment = new Appointment({
      appointmentDate: format(parse(req.body.appointmentDate,'dd-MM-yyyy', new Date() ), dateFromat),
      Status: req.body.status,
      arrivalDate: req.body.arrivalDate,
      patient: patientId,
    });

    try {
      const savedAppointment = await appointment.save();
      // res.status(201).json({ message: "Record saved." });
      patient.appointments.push(savedAppointment._id);
      await patient.save();
      } catch (err) {
      return res.status(401).json({ error: err.message });
    }

    //create Obstetric History document
    const obstetricHistory = new ObstetricHistory({
      numberOfPregnancies: parseInt(req.body.pregnancy),
      numberOfBirth: parseInt(req.body.birth),
      numberOfAbortionSpontaneous: parseInt(req.body.spontaneous),
      numberOfAbortionInduced: parseInt(req.body.induced),
      patient: patientId,
    });

    try {
      const savedObstetricHisotry = await obstetricHistory.save();
      // res.status(201).json({ message: "Record saved." });
      patient.obstetricHistory = savedObstetricHisotry._id;
      await patient.save();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }

    //create current pregnancy
    const currentPragnancy = new CurrentPregnancy({
      edd: format(parse(req.body.edd,'dd-MM-yyyy', new Date()), dateFromat),
      ega: parseInt(req.body.ega),
      patient: patient._id,
    });

    try {
      const savedCurrentPreg = await currentPragnancy.save();
      // res.status(201).json({ message: "Record saved." });
      patient.currentPregnancies.push(savedCurrentPreg._id);
      await patient.save();
    } catch (err) {
      return res.status(401).json({ error: err.message });
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
      // res.status(201).json({ message: "Record saved." });
      patient.riskFactor = savedriskFactor._id;
      await patient.save();
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }

    return res.status(201).json({ message: "Record saved." });
  }
);

patientRouter.post(
  "/addpatient",
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
      return res.status(400).json({ errors: errors.array() });
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
      phone: req.body.phone,
      email: req.body.email,
      institution: patient._id,
    });

    try {
      const savePatient = await patient.save();
      res.status(201).json({ message: "Record saved." });
      institution.patients.push(savePatient._id);
      institution.save();
    } catch (err) {
      return res.status(400).json({ error: err.message });
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
    body("lastname", "Last name must be between 4-150 characters long.").isLength({
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
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, {
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
          phone: req.body.phone,
          email: req.body.email,
        },
      });
      return res.status(200).send("Record Saved");
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);

patientRouter.delete("/:patientId", (req, res) => {
  Patient.findById(req.params.patientId, async function (err, patient) {
    if (err) {
      return next(err);
    }
    await patient.remove();
    return res.json({ message: "Patient deleted successfully." });
  });
});

module.exports = patientRouter;
