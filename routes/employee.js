const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Employee = require("../models/Employee");

//@route    POST register
//@desc     Register user
//@access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("status", "status is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  auth,
  async (req, res) => {
    try {
      const adminPermission = (
        await Employee.findById(req.employee.id).select("admin")
      ).admin;
      if (!adminPermission)
        return res
          .status(401)
          .json({ errors: [{ msg: "No admin permission" }] });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, admin, location, status, password } = req.body;

      //Check if employee exists

      let employee = await Employee.findOne({ email });

      if (employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee already exists" }] });
      }

      employee = new Employee({
        name,
        email,
        admin,
        location,
        status,
        password,
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      employee.password = await bcrypt.hash(password, salt);

      await employee.save();

      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
