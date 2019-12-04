import React, { Fragment } from 'react';
// import Spinner from '../../img/spinner.gif';
import ReactLoading from 'react-loading';

export default () => (
  <Fragment>
    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
      <ReactLoading type={'spin'} color={'grey'} />
    </div>
  </Fragment>
);
