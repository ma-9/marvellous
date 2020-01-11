import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ForOFor from '../../img/Confused.gif';
import Grid from '@material-ui/core/Grid';

const NotFound = () => {
  return (
    <Fragment>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <h1 className='large text-primary' align='left'>
              Oops!
            </h1>
            <p className='text-primary'>
              We can't seem to find the page you're looking for.
            </p>
            <code>Error code: 404</code>
            <br />
            <br />
            Here are some helpful links instead: <br />
            <p style={{ fontWeight: 'bolder' }}>
              <Link to='/'>Home</Link>
              <br />
              <Link to='/profiles'>Techies</Link>
              <br />
              <Link to='/register'>Sign Up</Link>
              <br />
              <Link to='/login'>Login</Link>
              <br />
              <Link to='/dashboard'>Dashboard</Link>
              <br />
              <Link to='/posts'>Posts</Link>
              <br />
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={ForOFor} alt='ForOFor' />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default NotFound;
