import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  exp: { company, title, to, from, description }
}) => (
  <div>
    <h3 className='text-dark'> {company} </h3>
    <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p>
      <strong>Job Title: {title}</strong>
    </p>
    <p>
      <strong>Description: {description}</strong>
    </p>
  </div>
);

ProfileExperience.propTypes = {
  exp: PropTypes.object.isRequired
};

export default ProfileExperience;
