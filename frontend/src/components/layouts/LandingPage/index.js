import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import useStyles from './style';
import WelcomeScreen from '../../../img/coder.gif';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import ContactIcon from '@material-ui/icons/RecentActors';
import GitHubIcon from '@material-ui/icons/GitHub';
import BookIcon from '@material-ui/icons/Book';
const AnimatedStyles = {
  animate: {
    animation: 'x 5s',
    animationName: Radium.keyframes(fadeIn, 'bounce')
  }
};

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles();
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <div>
            <div className={classes.title}>
              <StyleRoot>
                <p style={AnimatedStyles.animate}>Marvellous</p>
              </StyleRoot>
            </div>
            <StyleRoot>
              <div style={AnimatedStyles.animate}>
                <p className={classes.tagLine}>
                  A Blogging Platform for Developers
                </p>
                <br />
                <p className={classes.paraGraph}>
                  We are very delighted to welcome you as a new member of our
                  firm. We strongly believe that your skill and knowledge will
                  help us achieve what we aim for!
                </p>
              </div>
            </StyleRoot>
            <br />
            <br />
            <StyleRoot>
              <div style={AnimatedStyles.animate}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Link to='/register' className='center'>
                      <Button variant='contained' color='primary'>
                        Sign up with us Today !
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link to='/login' className='center'>
                      <Button variant='contained' color='secondary'>
                        Login, Welcome Back
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </StyleRoot>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <StyleRoot>
              <img
                style={AnimatedStyles.animate}
                src={WelcomeScreen}
                alt='Welcome to Marvellous'
              />
            </StyleRoot>
          </div>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Grid container spacing={3}>
        <StyleRoot>
          <Grid item xs={12} sm={12}>
            <div className={classes.centerHeading}>
              <p style={AnimatedStyles.animate}>Our Mission</p>
            </div>
            <div className={classes.missionContent}>
              <p style={AnimatedStyles.animate}>
                “To collect, preserve, study, exhibit, and stimulate
                appreciation for and advance knowledge of works of art that
                collectively represent the broadest spectrum of human
                achievement at the highest level of quality, all in the service
                of the public and in accordance with the highest professional
                standards.”
              </p>
              <br />
              <br />
            </div>
          </Grid>
        </StyleRoot>

        <Grid item xs={12} sm={4}>
          <div className={classes.ourMissionTabs}>
            <div className='center'>
              <ContactIcon style={{ color: '#240b36', fontSize: '3rem' }} />
            </div>
            <br />
            <p className='center'>
              "Thousands of Successful story beign with us!"
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.ourMissionTabs}>
            <div className='center'>
              <GitHubIcon style={{ color: '#240b36', fontSize: '3rem' }} />
            </div>
            <br />
            <p className='center'>
              "Don't make noise with your energy, make larger noise with your
              code"
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.ourMissionTabs}>
            <div className='center'>
              <BookIcon style={{ color: '#240b36', fontSize: '3rem' }} />
            </div>
            <br />
            <p className='center'>
              "Contribute to Open-Source and Help Developers via Posting and
              Replying to them"
            </p>
          </div>
        </Grid>
      </Grid>
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
