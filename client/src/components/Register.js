import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import Alert from "./Alert";
import { register } from "../actions/register";

const Register = ({ register, auth: { loading, employee } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    status: "",
    password: "",
  });

  let [admin, setAdmin] = useState(false);

  const { name, email, location, status, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onCheck = () => setAdmin(!admin);

  const onSubmit = async (e) => {
    e.preventDefault();
    register(name, email, admin, location, status, password);
  };
  return (
    !loading &&
    (!employee.admin ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <Form onSubmit={(e) => onSubmit(e)}>
          <h1>Add new employee</h1>
          <Alert />

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Check
              inline
              label="Provide admin permission"
              name="group1"
              onClick={onCheck}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              type="text"
              placeholder="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              name="status"
              type="text"
              placeholder="designation"
              value={status}
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
          <Link className="btn btn-light my-1 mx-1" to="dashboard">
            Go Back
          </Link>
        </Form>
      </Fragment>
    ))
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateTOProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateTOProps, { setAlert, register })(Register);
