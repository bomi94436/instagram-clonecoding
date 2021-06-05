import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Explore, Home, SignUp } from './components';
import { LoginContainer, UploadContainer } from './containers';
import AuthRoute from './AuthRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute authenticated="loggedIn" path="/" Component={Home} exact />
        <Route path="/login" component={LoginContainer} />
        <AuthRoute
          authenticated="notLoggedIn"
          path="/signup"
          Component={SignUp}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/explore"
          Component={Explore}
        />
        <AuthRoute
          authenticated="loggedIn"
          path="/upload"
          Component={UploadContainer}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
