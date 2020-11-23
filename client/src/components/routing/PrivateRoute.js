import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component, // so we can use <Component/> as <component/> isn't recognized by the browser (needs to be capitalized)
  auth: { isAuthenticated, loading },
  ...restOfProps
}) => (
  <Route
    {...restOfProps}
    render={props =>
      !isAuthenticated  && !loading ? (<Redirect to="/login" />) : (<Component {...props} />)
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);