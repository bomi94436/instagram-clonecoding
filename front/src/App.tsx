import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Explore, Home, SignUp } from './components';
import { LoginContainer } from './containers';
import AuthRoute from './AuthRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute authenticated="loggedIn" path="/" component={Home} exact />
        <AuthRoute
          authenticated="notLoggedIn"
          path="/login"
          component={LoginContainer}
        />
        <AuthRoute
          authenticated="notLoggedIn"
          path="/signup"
          component={SignUp}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/explore"
          component={Explore}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
