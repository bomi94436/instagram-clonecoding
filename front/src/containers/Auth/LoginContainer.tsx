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
  const { error } = useSelector((state: RootState) => state.auth.login);
  const { user } = useSelector((state: RootState) => state.auth);

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
    } else if (error) {
      alert(error.message);
    }
  }, [dispatch, history, user, error]);

  return <Login onSubmitLogin={onSubmitLogin} />;
};

export default LoginContainer;
