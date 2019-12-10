import React, { Fragment } from 'react';
import ReactLoading from 'react-loading';

export default () => (
  <Fragment>
    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
      <ReactLoading type={'spin'} color={'#240b36'} />
    </div>
  </Fragment>
);
