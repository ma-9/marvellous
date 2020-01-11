import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
        <Navbar />
      </Router>
    </Provider>
  );
};

export default App;
