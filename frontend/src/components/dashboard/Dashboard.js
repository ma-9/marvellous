import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import DashboardActionsButton from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      <div>
        {profile !== null ? (
          <Fragment>
            <DashboardActionsButton />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <br />
            <div className='my-2'>
              <button
                onClick={() => deleteAccount()}
                className='btn btn-danger'
              >
                Delete Account Permanently
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            You have not setup Profile yet, Please add some info
            <br />
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
            <div className='my-2'>
              <button
                onClick={() => deleteAccount()}
                className='btn btn-danger'
              >
                Delete Account Permanently
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
