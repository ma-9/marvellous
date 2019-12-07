import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  whiteColor: {
    color: 'white'
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <div style={{ display: 'flex' }}>
      <Link to='/dashboard'>
        <Button className={classes.whiteColor}>
          <PersonIcon className={classes.whiteColor} />
          Dashboard
        </Button>
      </Link>
      <a onClick={logout} href='#!' style={{ color: 'white', display: 'flex' }}>
        <Button className={classes.whiteColor}>
          <ExitToAppIcon />
          Logout
        </Button>
      </a>
    </div>
  );

  const guestLinks = (
    <div>
      <Link to='/'>
        <Button className={classes.whiteColor}>Developers</Button>
      </Link>
      <Link to='/register'>
        <Button className={classes.whiteColor}>Register</Button>
      </Link>
      <Link to='/login'>
        <Button className={classes.whiteColor}>Login</Button>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Link to='/' className={classes.whiteColor}>
              <DeveloperModeIcon />
            </Link>
          </IconButton>
          <Link to='/' className={classes.title}>
            <Typography variant='h6'>Marvellous IN</Typography>
          </Link>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
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

// import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../../actions/auth';
// import PersonIcon from '@material-ui/icons/Person';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

// const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
//   const authLinks = (
//     <ul>
//       <li>
//         <Link to='/dashboard' style={{ display: 'flex' }}>
//           <PersonIcon />
//           <span className='hide-sm'>Dashboard</span>
//         </Link>
//       </li>
//       <li>
//         <a onClick={logout} href='#!' style={{ display: 'flex' }}>
//           <ExitToAppIcon />
//           <span className='hide-sm'>Logout</span>
//         </a>
//       </li>
//     </ul>
//   );

//   const guestLinks = (
//     <ul>
//       <li>
//         <Link to='/'>Developers</Link>
//       </li>
//       <li>
//         <Link to='/register'>Register</Link>
//       </li>
//       <li>
//         <Link to='/login'>Login</Link>
//       </li>
//     </ul>
//   );

//   return (
//     <li className='navbar bg-dark'>
//       <h1>
//         <Link to='/'>
//           <DeveloperModeIcon /> Marvellous IN
//         </Link>
//       </h1>
// {!loading && (
//   <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
// )}
//     </li>
//   );
// };

// Navbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, { logout })(Navbar);
