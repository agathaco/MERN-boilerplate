import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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

export default Landing;
