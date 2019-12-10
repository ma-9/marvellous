import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfileByID } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({
  match,
  getProfileByID,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Techies
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Fragment>
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit Profile
                </Link>
              </Fragment>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
