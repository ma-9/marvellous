import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Navbar from './components/layouts/Navbar/Navbar';
import Navbar from './components/layouts/Appbar';
import setAuthToken from './utils/setAuthToken';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
