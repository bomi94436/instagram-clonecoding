import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { StaticContext } from 'react-router';
import { silentRefreshAsync } from './store/auth/actions';
import { IoLogoInstagram } from 'react-icons/all';
import { StyledLoading } from './styles/util';

interface props {
  authenticated: 'loggedIn' | 'notLoggedIn';
  path: string;
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>
    | undefined;
  [rest: string]: any;
}

const AuthRoute = ({ authenticated, path, component, ...rest }: props) => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.user.email);
  const nickname = useSelector((state: RootState) => state.auth.user.nickname);
  const isLoggedIn = email && nickname;
  const isLoading = useSelector(
    (state: RootState) => state.auth.silentRefresh.loading
  );

  useEffect(() => {
    if (authenticated === 'loggedIn' && !isLoggedIn) {
      dispatch(silentRefreshAsync.request());
    }
  }, [dispatch, authenticated, isLoggedIn]);

  if (isLoading === false) {
    switch (authenticated) {
      case 'loggedIn':
        if (!isLoggedIn) return <Redirect to="/login" />;
        else return <Route {...rest} path={path} component={component} />;

      case 'notLoggedIn':
        if (isLoggedIn) return <Redirect to="/" />;
        else return <Route {...rest} path={path} component={component} />;
    }
  } else
    return (
      <StyledLoading>
        <IoLogoInstagram />
      </StyledLoading>
    );
};

export default AuthRoute;
