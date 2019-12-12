import React, { Fragment } from 'react';
import ForOFor from '../../img/404.png';

const NotFound = () => {
  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='x-large text-primary'>Page Not Found</h1>
        <img
          src={ForOFor}
          alt='ForOFor'
          style={{ height: '60vh', width: '60vw' }}
        />
      </div>
    </Fragment>
  );
};

export default NotFound;
