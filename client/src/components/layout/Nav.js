import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: {user, isAuthenticated, loading}, logout, history }) => {
  const profileId = user ? user._id : null;


  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
      <Link to={`/profile/${profileId}`}>Profile</Link>
    </li>
      <li>
        <a onClick={logout} href="#!">
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

 

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          Mern Boilerplate
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,

});

export default connect(mapStateToProps, { logout })(Navbar);

