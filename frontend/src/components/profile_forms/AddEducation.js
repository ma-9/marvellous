import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const {
    school,
    degree,
    fieldofstudy,
    from: from,
    to,
    current,
    description
  } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  const toggleCurrent = (e) => {
    setFormData({
      ...formData,
      current: e.target.checked
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            placeholder='Field Of Study'
            name='fieldofstudy'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            value={from}
            onChange={(e) => onChange(e)}
            name='from'
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              checked={current}
              value={current}
              onChange={(e) => toggleCurrent(e)}
              name='current'
            />
            Current School or Bootcamp
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            value={to}
            onChange={(e) => onChange(e)}
            name='to'
            disabled={current ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            value={description}
            onChange={(e) => onChange(e)}
            rows='5'
            placeholder='Program Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
