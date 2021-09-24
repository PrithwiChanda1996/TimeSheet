const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimesheetScheme = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Timesheet = mongoose.model("timesheet", TimesheetScheme);
