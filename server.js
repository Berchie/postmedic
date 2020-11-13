if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

//Routers
const authRouter = require("./controllers/Auth");
const doctorRouter = require('./controllers/Doctor');
const ObHistoryRouter =  require('./controllers/ObstetricHistory');
const CurrentPregRouter = require('./controllers/CurrentPregnancy');
const admissionRouter = require('./controllers/Admission');
const appointmentRouter = require('./controllers/Appointment');
const riskFactorRouter = require('./controllers/RiskFactor');
const patientRouter = require('./controllers/Patient');

require("dotenv").config();

// const session = require('express-session')
const passport = require('passport')
// const flash = require('express-flash')

// Passport config
require('./utils/passport')(passport);

const app = express();

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mangoDB conncection
var datetime = new Date();
mongoose.connect(config.MONGODB_URI, config.MONGODB_URI_CONFIG, () => {
  logger.info(
    "Connected to mongoDb at",
    datetime.toISOString().slice(0, 10),
    datetime.toISOString().slice(11, 19)
  );
});

// Passport middleware
app.use(passport.initialize());

//express-session
// app.use(flash())
// app.use(session({
//   secret: process.env.SECRET_SESSION,
//   resave: false,
//   saveUninitialized: true
// }))

//ROUTES
/*users route*/
app.use("/auth", authRouter);

//Patient or client related routes
app.use('/patient', patientRouter);
app.use('/obstetric', ObHistoryRouter);
app.use('/currentpregnancy', CurrentPregRouter);
app.use('/admission', admissionRouter);
app.use('/appointment', appointmentRouter);
app.use('/riskfactor', riskFactorRouter);

/*doctors route*/
app.use('/doctor', doctorRouter);

app.get("/", (req, res) => {
  res.status(200).end("Welcome to PostMedic API");
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

app.post("/api/notes", (request, response) => {
  const note = new Note({
    content: request.body.content,
    date: request.body.date,
    important: request.body.important,
  });
  note.save().then((result) => {
    console.log("note saved!");
    response.json(result);
    mongoose.connection.close();
  });
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
