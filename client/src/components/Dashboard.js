import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { getTimesheet } from "../actions/timesheet";

const Dashboard = ({
  auth: { loading, employee },
  timesheet: { timesheetData },
  getTimesheet,
}) => {
  useEffect(() => {
    getTimesheet();
  }, [getTimesheet]);

  return (
    !loading &&
    employee && (
      <Fragment>
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
            <Link to="/timesheet">
              <Button variant="primary">Add Timesheet</Button>
            </Link>
            {employee.admin && (
              <Link to="/register">
                <Button className="float-end" variant="primary">
                  Add Employee
                </Button>
              </Link>
            )}
          </Card.Body>
        </Card>
        <Card className="my-2">
          <Card.Header>Filled status</Card.Header>
          {timesheetData.map((data) => (
            <Card>
              <Card.Text className="px-3 py-3">
                <p>
                  {data.date} from {data.from} to {data.to}
                </p>
                <p>Status: {data.status}</p>
              </Card.Text>
            </Card>
          ))}
        </Card>
      </Fragment>
    )
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  timesheet: PropTypes.object.isRequired,
  getTimesheet: PropTypes.func.isRequired,
};

const mapStateTOProps = (state) => ({
  auth: state.auth,
  timesheet: state.timesheet,
});

export default connect(mapStateTOProps, { getTimesheet })(Dashboard);
