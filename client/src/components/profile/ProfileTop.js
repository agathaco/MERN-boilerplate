import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    location,
    social,
    bio,
    user: { name, avatar },
  },
}) => {
  return (
    <Fragment>
      <div className="profile-top">
        <img src={avatar} alt="" />
        <div className="profile-details">
          <div className="profile-contact">
            <h1 className="medium">{name}</h1>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
              {social && social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                twitter
                </a>
              )}
              {social && social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {social && social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {social && social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {social && social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </div>
          </div>
          <div className="profile-about">
          {bio && (
            <Fragment>
              <h3>
                {name && name.trim().split(" ")[0]}'s Bio
              </h3>
              <p>{bio}</p>
              <div className="line" />
            </Fragment>
          )}
        </div>
          </div>
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
