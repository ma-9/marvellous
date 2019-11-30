import React, { Fragment } from 'react';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
};

export default App;
