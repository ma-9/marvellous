import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { tada } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
const AnimatedStyles = {
  animate: {
    animation: 'x 5s',
    animationName: Radium.keyframes(tada, 'bounce')
  }
};

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='landing'>
      <StyleRoot>
        <h1 style={AnimatedStyles.animate}>Hellllo</h1>
      </StyleRoot>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
