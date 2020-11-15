const institutionRoute = require("express").Router();
const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");
const Institution = require("../models/Institution");
const User = require("../models/User");
const Doctors = require("../models/Doctor");

institutionRoute.get("/", async (req, res) => {
  const data = await Institution.findOne().populate(req.query.instId);
  res.status(200).json(data);
});

institutionRoute.put(
  "/:id",
  [
    body("name", "Institution name field cannot be empty.").not().isEmpty(),
    body("name", "Institution name must be between 4-150 characters long.").isLength({
      min: 4,
      max: 150,
    }),
    body("city", "City field cannot be empty.").not().isEmpty().trim().escape(),
    body("city", "City must be between 4-100 characters long.").isLength({ min: 4, max: 100 }),
  ],
  async (req, res) => {
    try {
      const instiution = await Institution.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          telephone: req.body.telephone,
        },
      });
      res.status(200).json({message:"Record saved."});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = institutionRoute;
