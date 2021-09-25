import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

//Register user
export const register =
  (name, email, admin, location, status, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      email,
      admin,
      location,
      status,
      password,
    });

    try {
      await axios.post("/employee/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch(setAlert("Employee Added successfully", "success"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
