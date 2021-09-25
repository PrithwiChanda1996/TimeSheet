import { GET_TIMESHEET, TIMESHEET_ERROR } from "../actions/types";

const initialState = {
  timesheetData: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TIMESHEET:
      return {
        ...state,
        timesheetData: payload,
      };
    case TIMESHEET_ERROR:
      return {
        ...state,
        timesheetData: [],
        error: payload,
      };
    default:
      return state;
  }
}
