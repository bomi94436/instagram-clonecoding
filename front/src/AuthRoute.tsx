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
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user.email && user.nickname;

  switch (authenticated) {
    case 'loggedIn':
      if (!isLoggedIn) return <Redirect to="/login" />;
      else
        return (
          <Route
            {...rest}
            path={path}
            component={() => <Component user={user} />}
          />
        );

    case 'notLoggedIn':
      if (isLoggedIn) return <Redirect to="/" />;
      else
        return <Route {...rest} path={path} component={() => <Component />} />;
  }
};

export default AuthRoute;
