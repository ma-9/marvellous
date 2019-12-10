import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfileByID } from '../../actions/profile';

const Profile = ({
  match,
  getProfileByID,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID]);
  return <div>Profile ID = {match.params.id} </div>;
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
