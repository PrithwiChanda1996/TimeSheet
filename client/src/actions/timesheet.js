import axios from "axios";
import { GET_TIMESHEET, TIMESHEET_ERROR, TIMESHEET_SUBMIT } from "./types";
import { setAlert } from "./alert";

//Get submitted timesheet
export const getTimesheet = () => async (dispatch) => {
  try {
    const res = await axios.get("/timesheet");
    dispatch({
      type: TIMESHEET_ERROR,
    });
    dispatch({
      type: GET_TIMESHEET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TIMESHEET_ERROR,
    });
  }
};

export const timesheet = (date, from, to, status) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    date,
    from,
    to,
    status,
  });

  try {
    if (from > to) {
      dispatch(setAlert("To time must be greater than from time", "danger"));
    } else {
      await axios.post("/timesheet", body, config);

      dispatch({
        type: TIMESHEET_SUBMIT,
      });
      dispatch(setAlert("Employee Added successfully", "success"));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: TIMESHEET_ERROR,
    });
  }
};
