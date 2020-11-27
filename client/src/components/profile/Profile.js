import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import { getProfileById, deleteAccount } from '../../actions/profile';

const Profile = ({ getProfileById, deleteAccount, profile: { profile }, auth: { isAuthenticated, loading, user }, match, history }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/dashboard" className="btn btn-light">
            Back To Dashboard
          </Link>
          {isAuthenticated &&
            loading === false &&
            user._id === profile.user._id && (
              <Fragment>
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
              <button className="btn btn-danger" onClick={() => deleteAccount(history)}>
                <i className="fas fa-user-minus" /> Delete My Account
              </button>
            </Fragment>
            )}
            <div className="profile-grid">
              <ProfileTop profile={profile} />
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(withRouter(Profile));