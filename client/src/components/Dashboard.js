import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";

const Dashboard = ({ auth: { isAuthenticated, loading, employee } }) => {
  return (
    !loading &&
    employee && (
      <Card>
        <Card.Header>{employee.name}</Card.Header>
        <Card.Body>
          <Card.Title>{employee.status}</Card.Title>
          <Card.Text>
            <p>
              Email: <span>{employee.email}</span>
            </p>
            <p>
              Location: <span>{employee.location}</span>
            </p>
          </Card.Text>
          <Button variant="primary">Add Timesheet</Button>
          {employee.admin && (
            <Link to="/register">
              <Button className="float-end" variant="primary">
                Add Employee
              </Button>
            </Link>
          )}
        </Card.Body>
      </Card>
    )
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateTOProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateTOProps)(Dashboard);
