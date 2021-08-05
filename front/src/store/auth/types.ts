import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  addLikedPost,
  clearAutoLogin,
  decreasePostCount,
  getUserInfoAsync,
  loginAsync,
  logoutAsync,
  removeLikedPost,
  setAutoLogin,
  signUpAsync,
  silentRefreshAsync,
} from './actions';

export type AuthState = {
  user: UserInfo;
  signup: AsyncState<ResponseData, ResponseData>;
  login: AsyncState<ResponseData, ResponseData>;
  silentRefresh: AsyncState<ResponseData, ResponseData>;
  logout: AsyncState<ResponseData, ResponseData>;
  getUserInfo: AsyncState<ResponseData, ResponseData>;
  timer: NodeJS.Timeout | null;
};

export type AuthAction = ActionType<
  | typeof signUpAsync
  | typeof loginAsync
  | typeof silentRefreshAsync
  | typeof logoutAsync
  | typeof getUserInfoAsync
  | typeof setAutoLogin
  | typeof clearAutoLogin
  | typeof decreasePostCount
  | typeof addLikedPost
  | typeof removeLikedPost
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
