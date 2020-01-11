import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import useStyles from './style';
import WelcomeScreen from '../../../img/coder.gif';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
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
              </div>
            </StyleRoot>
            <br />
            <StyleRoot>
              <div style={AnimatedStyles.animate}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Link to='/register'>
                      <Button variant='contained' color='primary'>
                        Register
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link to='/login'>
                      <Button variant='contained' color='secondary'>
                        Login
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
