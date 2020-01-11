import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile_forms/CreateProfile';
import EditProfile from '../profile_forms/EditProfile';
import AddEducation from '../profile_forms/AddEducation';
import AddExperience from '../profile_forms/AddExperience';
import PrivateRoute from '../routing/PrivateRouter';
import GetProfiles from '../Profiles/Profiles';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import Alert from '../layouts/Alert';
import NotFound from '../layouts/NotFound';
import Landing from '../layouts/LandingPage';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={GetProfiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
