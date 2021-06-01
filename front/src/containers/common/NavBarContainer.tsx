import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import NavBar from '../../components/common/NavBar';
import { clearAutoLogin, logoutAsync } from '../../store/auth/actions';

const NavBarContainer = () => {
  const dispatch = useDispatch();
  const { nickname } = useSelector((state: RootState) => state.auth.user);

  const onClickLogout = useCallback((): void => {
    dispatch(logoutAsync.request());
    dispatch(clearAutoLogin());
  }, [dispatch]);

  return <NavBar user={nickname} onClickLogout={onClickLogout} />;
};

export default NavBarContainer;
