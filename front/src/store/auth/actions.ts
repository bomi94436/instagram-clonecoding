import { createAction, createAsyncAction } from 'typesafe-actions';
import { LoginData, SignUpData } from './types';

export const SIGN_UP = 'auth/SIGN_UP';
export const SIGN_UP_SUCCESS = 'auth/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'auth/SIGN_UP_ERROR';

export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';

export const SILENT_REFRESH = 'auth/SILENT_REFRESH';
export const SILENT_REFRESH_SUCCESS = 'auth/SILENT_REFRESH_SUCCESS';
export const SILENT_REFRESH_ERROR = 'auth/SILENT_REFRESH_ERROR';

export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'auth/LOGOUT_ERROR';

export const LIKE_POST = 'auth/LIKE_POST';
export const LIKE_POST_SUCCESS = 'auth/LIKE_POST_SUCCESS';
export const LIKE_POST_ERROR = 'auth/LIKE_POST_ERROR';

export const UNLIKE_POST = 'auth/UNLIKE_POST';
export const UNLIKE_POST_SUCCESS = 'auth/UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_ERROR = 'auth/UNLIKE_POST_ERROR';

export const SET_AUTO_LOGIN = 'auth/SET_AUTO_LOGIN';
export const CLEAR_AUTO_LOGIN = 'auth/CLEAR_AUTO_LOGIN';

export const signUpAsync = createAsyncAction(
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
)<SignUpData, ResponseData, ResponseData>();

export const loginAsync = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  LoginData,
  ResponseData,
  ResponseData
>();

export const silentRefreshAsync = createAsyncAction(
  SILENT_REFRESH,
  SILENT_REFRESH_SUCCESS,
  SILENT_REFRESH_ERROR
)<undefined, ResponseData, ResponseData>();

export const logoutAsync = createAsyncAction(
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
)<undefined, ResponseData, ResponseData>();

export const likePostAsync = createAsyncAction(
  LIKE_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR
)<{ postId: number }, ResponseData, ResponseData>();

export const unlikePostAsync = createAsyncAction(
  UNLIKE_POST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_ERROR
)<{ postId: number }, ResponseData, ResponseData>();

export const setAutoLogin = createAction(SET_AUTO_LOGIN, ({ timer }) => ({
  timer,
}))();

export const clearAutoLogin = createAction(CLEAR_AUTO_LOGIN)();
