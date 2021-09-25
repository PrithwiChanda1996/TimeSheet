const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Employee = require("../models/Employee");
const Token = require("../models/Token");

//@route    GET auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select(
      "-password"
    );
    res.json(employee);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST auth
//@desc     Authenticate employee and get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //Check if employee exists

      let employee = await Employee.findOne({ email });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Validating password
      const isMatch = await bcrypt.compare(password, employee.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });

      // Return JWT

      const payload = {
        employee: {
          id: employee.id,
        },
      };

      let accessToken = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 3600,
      });

      //Token save in database
      token = new Token({
        token: accessToken,
      });
      await token.save();
      res.json({ token: accessToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    DELETE auth
//@desc     Delete API token
//@access   Public
router.delete("/", auth, async (req, res) => {
  await Token.findOneAndDelete({ token: req.token });
  res.json({ msg: "Deleted" });
});

module.exports = router;
