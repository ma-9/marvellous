import React, { useState, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = (props) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: ''
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    instagram,
    facebook,
    linkedin,
    youtube
  } = formData;

  const [displaySocialLinks, toggleSocialLinks] = useState(false);

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form'>
        <div className='form-group'>
          <select name='status'>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Company' name='company' />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Website' name='website' />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Location' name='location' />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Skills' name='skills' />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea placeholder='A short bio of yourself' name='bio'></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            onClick={() => toggleSocialLinks(!displaySocialLinks)}
            className='btn btn-light'
          >
            {displaySocialLinks ? (
              <Fragment>Shrink Social Network Links</Fragment>
            ) : (
              <Fragment>Expand Social Network Links</Fragment>
            )}
          </button>
          <span>Optional</span>
        </div>

        {displaySocialLinks && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input type='text' placeholder='Twitter URL' name='twitter' />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input type='text' placeholder='Facebook URL' name='facebook' />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input type='text' placeholder='YouTube URL' name='youtube' />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input type='text' placeholder='Linkedin URL' name='linkedin' />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input type='text' placeholder='Instagram URL' name='instagram' />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

// CreateProfile.propTypes = {};

export default connect()(CreateProfile);
