// import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../../actions/auth';
// import PersonIcon from '@material-ui/icons/Person';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { flexbox, borderRight } from '@material-ui/system';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     userSelect: 'none'
//   }
// }));

// const Navbar = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position='fixed'>
//         <Toolbar className='NavbarLinks'>
//           <Button color='inherit' className='NavbarLinks'>
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default Navbar;

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard' style={{ display: 'flex' }}>
          <PersonIcon />
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!' style={{ display: 'flex' }}>
          <ExitToAppIcon />
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <li className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <DeveloperModeIcon /> Marvellous IN
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </li>
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
