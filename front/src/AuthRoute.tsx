import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface props {
  authenticated: 'loggedIn' | 'notLoggedIn';
  path: string;
  Component: React.ComponentType<any>;
  [rest: string]: any;
}

const AuthRoute = ({ authenticated, path, Component, ...rest }: props) => {
  const email = useSelector((state: RootState) => state.auth.user.email);
  const nickname = useSelector((state: RootState) => state.auth.user.nickname);
  const isLoggedIn = email && nickname;

  switch (authenticated) {
    case 'loggedIn':
      if (!isLoggedIn) return <Redirect to="/login" />;
      else
        return <Route {...rest} path={path} component={() => <Component />} />;

    case 'notLoggedIn':
      if (isLoggedIn) return <Redirect to="/" />;
      else
        return <Route {...rest} path={path} component={() => <Component />} />;
  }
};

export default AuthRoute;
