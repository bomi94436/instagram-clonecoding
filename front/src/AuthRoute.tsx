import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface props {
  authenticated: 'loggedIn' | 'notLoggedIn';
  path: string;
  component: React.ComponentType<any>;
  [rest: string]: any;
}

const AuthRoute = ({ authenticated, path, component, ...rest }: props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = user.email && user.nickname;
  const Component = <Route {...rest} path={path} component={component} />;

  switch (authenticated) {
    case 'loggedIn':
      if (!isLoggedIn) return <Redirect to="/login" />;
      else return Component;

    case 'notLoggedIn':
      if (isLoggedIn) return <Redirect to="/" />;
      else return Component;
  }
};

export default AuthRoute;
