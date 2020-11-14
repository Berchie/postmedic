const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");
const Institution = require("../models/Institution");
const User = require("../models/User");
const logger = require("../utils/logger");

let initialInstID = null;
let userid = null;

authRouter.get('/', async (req, res)=>{
  try {
    const allUsers = await User.find({institution: req.body.institutionId});
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});


authRouter.get('/:id', async(req, res)=>{
  try {
    const user = await User.findById(req.params.id).exec();
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

authRouter.post(
  "/signup",
  [
    body("name", "Institution name field cannot be empty.").not().isEmpty(),
    body("name", "Institution name must be between 4-150 characters long.").isLength({
      min: 4,
      max: 150,
    }),
    body("fullname", "User Name field cannot be empty.").not().isEmpty().trim().escape(),
    body("fullname", "Name must be between 1-100 characters long.").isLength({ min: 1, max: 100 }),
    body("username", "Username field cannot be empty.").not().isEmpty(),
    body("username", "Username must be between 4-15 characters long.").isLength({
      min: 4,
      max: 15,
    }),
    body("email", "The email you entered is invalid, please try again.").isEmail(),
    body(
      "email",
      "Email address must be between 4-100 characters long, please try again."
    ).isLength({ min: 7, max: 100 }),
    body("password", "Password field cannot be empty.").not().isEmpty().trim().escape(),
    body("password", "Password must be between 8-100 characters long.").isLength(8, 100),
    body(
      "password",
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),

    //} Additional validation to ensure username is alphanumeric with underscores and dashes
    body("username", "Username can only contain letters, numbers, or underscores.").matches(
      /^[A-Za-z0-9_-]+$/,
      "i"
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Institution.findOne({ name: req.body.name }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Insitution already exists" });
      }
    });

    //create new sign up
    const institution = new Institution({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      telephone: req.body.telephone,
    });

    try {
      const saveInstitute = await institution.save();
      res.json({ msg: "Successfuly Regiterd" });
      initialInstID = saveInstitute._id;
    } catch (err) {
      res.json({ message: err.message });
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      }
    });

    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Username already exists" });
      }
    });

    //create default admin user for an institution
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.json({ error: err.message });
      } else {
        let defaultUser = new User({
          name: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          passwordHash: hash,
          role: "Admin",
          institution: initialInstID,
        });
        try {
          const saveDefaultUser = await defaultUser.save();
          res.status(201).json({ msg: "user created!" });
          userid=saveDefaultUser._id;
        } catch (error) {
          res.json({ message: error.message });
        }

        try {
          institution.users.push(userid);
           institution.save();
        } catch (err) {
          res.status(400).json({error: err.message});
        }
      }
    });
  }
);

authRouter.post(
  "/createuser",
  [
    //express validation of request body
    body("fullname", "User Name field cannot be empty.").not().isEmpty().trim().escape(),
    body("fullname", "Name must be between 1-100 characters long.").isLength({ min: 1, max: 100 }),
    body("username", "Username field cannot be empty.").not().isEmpty(),
    body("email", "Email field cannot be empty.").not().isEmpty(),
    body("email", "Provide valid email address..").isEmail(),
    body("username", "Username must be between 4-15 characters long.").isLength({
      min: 4,
      max: 15,
    }),
    body("password", "Password field cannot be empty.").not().isEmpty(),
    body("password", "Password must be between 8-100 characters long.").isLength({
      min: 8,
      max: 100,
    }),
    body(
      "password",
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    body("username", "Username can only contain letters, numbers, or underscores.").matches(
      /^[A-Za-z0-9_-]+$/,
      "i"
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      }
    });

    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Username already exists" });
      }
    });

    //hashing the userpassword
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      let user = new User({
        name: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        passwordHash: hash,
        role: req.body.role,
        institution: req.body.initialInstID,
      });
      try {
        const saveUser = await user.save();
        res.json({ msg: "user created!" });
      } catch (error) {
        res.json({ message: error.message });
      }
    });
  }
);

authRouter.post(
  "/login",
  [
    body("username", "Username field cannot be empty.").not().isEmpty(),
    body("username", "Username must be between 4-15 characters long.").isLength({
      min: 4,
      max: 15,
    }),
    body("password", "Password field cannot be empty.").not().isEmpty(),
    body("password", "Password must be between 8-100 characters long.").isLength({
      min: 8,
      max: 100,
    }),
    body(
      "password",
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    body("username", "Username can only contain letters, numbers, or underscores.").matches(
      /^[A-Za-z0-9_-]+$/,
      "i"
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // logger.error(res.send({ error: errors.array() }));
      return res.status(400).json({ errors: errors.array() });
    }

    // res.status(200).json(req.body);
    const user = await User.findOne({ username: req.body.username }).exec();
    logger.info(user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(req.body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "invaild usersname or password" });
    }

    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
    };
    
    // Sign token
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      }
    );
  }
);

module.exports = authRouter;
