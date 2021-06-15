import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  clearAutoLogin,
  getUserInfoAsync,
  likePostAsync,
  loginAsync,
  logoutAsync,
  setAutoLogin,
  signUpAsync,
  silentRefreshAsync,
  unlikePostAsync,
} from './actions';

export type AuthState = {
  user: UserInfo;
  signup: AsyncState<ResponseData, ResponseData>;
  login: AsyncState<ResponseData, ResponseData>;
  silentRefresh: AsyncState<ResponseData, ResponseData>;
  likePost: AsyncState<ResponseData, ResponseData>;
  unlikePost: AsyncState<ResponseData, ResponseData>;
  logout: AsyncState<ResponseData, ResponseData>;
  getUserInfo: AsyncState<ResponseData, ResponseData>;
  timer: NodeJS.Timeout | null;
};

export type AuthAction = ActionType<
  | typeof signUpAsync
  | typeof loginAsync
  | typeof silentRefreshAsync
  | typeof logoutAsync
  | typeof likePostAsync
  | typeof unlikePostAsync
  | typeof getUserInfoAsync
  | typeof setAutoLogin
  | typeof clearAutoLogin
>;

export interface SignUpData {
  email: string | undefined;
  password: string | undefined;
  nickname: string | undefined;
}

export interface LoginData {
  email: string | undefined;
  password: string | undefined;
}
