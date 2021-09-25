import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "./Alert";
import { timesheet } from "../actions/timesheet";
import { setAlert } from "../actions/alert";

const TimesheetForm = ({ timesheet, auth: { loading, employee } }) => {
  const [formData, setFormData] = useState({
    date: "",
    from: "",
    to: "",
    status: "",
  });

  const { date, from, to, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    timesheet(date, from, to, status);
  };
  return (
    !loading && (
      <Fragment>
        <Form onSubmit={(e) => onSubmit(e)}>
          <h1>Timesheet fill-up</h1>
          <Alert />

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              placeholder="dd/mm"
              value={date}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>From</Form.Label>
            <Form.Control
              name="from"
              type="time"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>To</Form.Label>
            <Form.Control
              name="to"
              type="time"
              value={to}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Status</Form.Label>
            <Form.Control
              name="status"
              type="text"
              placeholder="Status of the day"
              value={status}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link className="btn btn-light my-1 mx-1" to="dashboard">
            Go Back
          </Link>
        </Form>
      </Fragment>
    )
  );
};

TimesheetForm.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  timesheet: PropTypes.func.isRequired,
};

const mapStateTOProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateTOProps, { setAlert, timesheet })(TimesheetForm);
