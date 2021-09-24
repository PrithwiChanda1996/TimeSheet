const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Timesheet = require("../models/Timesheet");

//@route    POST timesheet
//@desc     create a post
//@access   Private
router.post(
  "/",
  [
    check("date", "Date is required").not().isEmpty(),
    check("from", "From time is required").not().isEmpty(),
    check("to", "To time is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, from, to, status } = req.body;

    try {
      //Checking if tiesheet already updated
      let timesheet = await Timesheet.findOne({
        employee: req.employee.id,
        date: date,
      });

      if (timesheet) return res.status(400).send("Timesheet already updated");
      timesheet = new Timesheet({
        employee: req.employee.id,
        date,
        from,
        to,
        status,
      });

      await timesheet.save();

      res.json(timesheet);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
