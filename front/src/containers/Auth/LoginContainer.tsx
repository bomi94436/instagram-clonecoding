import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { loginAsync } from '../../store/auth/actions';
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
      history.push('/');
    } else if (error) {
      alert(error.message);
    }
  }, [history, user, error]);

  return <Login onSubmitLogin={onSubmitLogin} />;
};

export default LoginContainer;
