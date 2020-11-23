import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className="landing">
      <div className="landing-inner">
        <h1 className="x-large">Mern Boilerplate</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam qui
          totam accusantium voluptatem nemo. Sequi consequatur dolores quae!
          Facere laboriosam nulla sint velit fugiat quas animi laborum, tempora
          illum libero.
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
