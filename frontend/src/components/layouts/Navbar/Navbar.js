import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Box } from '@material-ui/core';
import ButtonAppBarCollapse from './ButtonAppBarCollapse';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Techies from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton';
import PostIcon from '@material-ui/icons/Book';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#240b36'
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  blackColor: {
    color: 'black'
  },
  whiteColor: {
    color: 'white'
  },
  buttonBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    margin: '10px',
    paddingLeft: '16px',
    right: 0,
    position: 'relative',
    width: '100%',
    background: 'transparent'
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <div style={{ display: 'flex' }}>
      <Link to='/posts'>
        <MenuItem className={classes.whiteColor}>
          <PostIcon className={classes.whiteColor} />
          Posts
        </MenuItem>
      </Link>
      <Link to='/dashboard'>
        <MenuItem className={classes.whiteColor}>
          <PersonIcon className={classes.whiteColor} />
          Dashboard
        </MenuItem>
      </Link>
      <a
        onClick={logout}
        href='#!'
        rel='noopener noreferrer'
        style={{ color: 'white', display: 'flex' }}
      >
        <MenuItem className={classes.whiteColor}>
          <ExitToAppIcon />
          Logout
        </MenuItem>
      </a>
    </div>
  );

  const authLinksForMobile = (
    <div style={{ display: 'flex' }}>
      <Link to='/posts'>
        <MenuItem className={classes.blackColor}>
          <PostIcon className={classes.blackColor} />
          Posts
        </MenuItem>
      </Link>
      <Link to='/dashboard'>
        <MenuItem className={classes.blackColor}>
          <PersonIcon className={classes.blackColor} />
          Dashboard
        </MenuItem>
      </Link>
      <a
        onClick={logout}
        href='#!'
        rel='noopener noreferrer'
        style={{ color: 'white', display: 'flex' }}
      >
        <MenuItem className={classes.blackColor}>
          <ExitToAppIcon />
          Logout
        </MenuItem>
      </a>
    </div>
  );

  const guestLinks = (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Link to='/register'>
        <MenuItem className={classes.whiteColor}>Register</MenuItem>
      </Link>
      <Link to='/login'>
        <MenuItem className={classes.whiteColor}>Login</MenuItem>
      </Link>
    </div>
  );

  const guestLinksForMobile = (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Link to='/register'>
        <MenuItem className={classes.blackColor}>Register</MenuItem>
      </Link>
      <Link to='/login'>
        <MenuItem className={classes.blackColor}>Login</MenuItem>
      </Link>
    </div>
  );

  return (
    <div>
      <AppBar position='fixed' className={classes.root}>
        <Toolbar>
          <Link to='/' className={classes.title} style={{ display: 'flex' }}>
            <DeveloperModeIcon />
            <Typography variant='h6'>Marvellous IN</Typography>
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ButtonAppBarCollapse>
              {!loading && (
                <Box>
                  {isAuthenticated ? authLinksForMobile : guestLinksForMobile}
                </Box>
              )}
            </ButtonAppBarCollapse>
            <Link to='/profiles'>
              <MenuItem className={classes.whiteColor}>
                <Techies className={classes.whiteColor} />
                Techies
              </MenuItem>
            </Link>
            <div className={classes.buttonBar} id='appbar-collapse'>
              {!loading && (
                <Box>{isAuthenticated ? authLinks : guestLinks}</Box>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
