import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'> {edu.degree} </td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td style={{ textAlign: 'right' }}>
        <button className='btn btn-danger'>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Educational Details</h2>
      <table className='table' width='100%'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

// Education.propTypes = {};

export default Education;
