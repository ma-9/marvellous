import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Box component='div' className='dark-overlay'>
        <Box component='div' className='landing-inner'>
          <Typography variant='h2' gutterBottom>
            Marvellous - A Blogging Platform
          </Typography>
          <Typography variant='h6' gutterBottom>
            Create a developer profile, share blogs/posts and get help from
            other developers
          </Typography>
          <Box component='div'>
            <Link to='/register'>
              <Button
                variant='contained'
                style={{
                  backgroundColor: '#240b36',
                  color: '#fff',
                  marginRight: '20px'
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to='/login'>
              <Button variant='contained'>Sign In</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
