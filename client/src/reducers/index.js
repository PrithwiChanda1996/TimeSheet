import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import timesheet from "./timesheet";

export default combineReducers({
  alert,
  auth,
  timesheet,
});
