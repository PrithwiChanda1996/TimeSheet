import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const logoutBtn = (
    <Nav className="justify-content-end">
      <Nav.Link onClick={logout} to="/">
        Log Out
      </Nav.Link>
    </Nav>
  );

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Timesheet</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          {!loading && <Fragment>{isAuthenticated && logoutBtn}</Fragment>}
        </Container>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateTOProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateTOProps, { logout })(Header);
