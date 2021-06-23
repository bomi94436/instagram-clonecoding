import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  loginAsync,
  setAutoLogin,
  silentRefreshAsync,
} from '../../store/auth/actions';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const history = useHistory();

  const onSubmitLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => (
      email: string,
      password: string
    ): void => {
      e.preventDefault();
      dispatch(loginAsync.request({ email, password }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (user.email !== null && user.nickname !== null) {
      const timer = setInterval(() => {
        dispatch(silentRefreshAsync.request());
      }, 1000 * 60 * 59);

      dispatch(setAutoLogin({ timer }));

      history.push('/');
    }
  }, [dispatch, history, user]);

  return <Login onSubmitLogin={onSubmitLogin} />;
};

export default LoginContainer;
