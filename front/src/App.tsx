import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SignUp, Tags } from './components';
import {
  ExploreContainer,
  HomeContainer,
  LoginContainer,
  UploadContainer,
} from './containers';
import AuthRoute from './AuthRoute';
import history from './lib/history';
import { Router } from 'react-router';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AuthRoute
          authenticated="loggedIn"
          path="/"
          Component={HomeContainer}
          exact
        />
        <Route path="/login" component={LoginContainer} />
        <AuthRoute
          authenticated="notLoggedIn"
          path="/signup"
          Component={SignUp}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/explore/tags/:tag"
          Component={Tags}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/explore"
          Component={ExploreContainer}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/upload"
          Component={UploadContainer}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
