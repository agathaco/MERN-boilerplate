import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from './Spinner';

const Dashboard = ({ getCurrentProfile, auth: { user, isAuthenticated }, profile: { profile, loading }} ) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // Redirect after logout
  if (!isAuthenticated) {
    return <Redirect to="/" />
  }

  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      Welcome {user && user.name}
    </p>
  </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(
  Dashboard
);