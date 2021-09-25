import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { setAlert } from "../actions/alert";
import { connect } from "react-redux";
import Alert from "./Alert";

const Login = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) setAlert("Email and Password required", "danger");
    else console.log(email, password);
  };

  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <h1>Log in and fill up timesheet</h1>
        <Alert />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Login);
