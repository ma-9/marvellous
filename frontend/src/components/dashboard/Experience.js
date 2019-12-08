import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'> {exp.title} </td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td style={{ textAlign: 'right' }}>
        {' '}
        <button className='btn btn-danger'>
          <DeleteIcon />
        </button>{' '}
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table' width='100%'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

// Experience.propTypes = {};

export default Experience;
