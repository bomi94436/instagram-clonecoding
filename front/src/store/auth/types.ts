import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import { loginAsync, signUpAsync } from './actions';

export type AuthState = {
  user: UserInfo;
  signup: AsyncState<ResponseData, ResponseData>;
  login: AsyncState<ResponseData, ResponseData>;
};

export type AuthAction = ActionType<typeof signUpAsync | typeof loginAsync>;

export interface SignUpData {
  email: string | undefined;
  password: string | undefined;
  nickname: string | undefined;
}

export interface LoginData {
  email: string | undefined;
  password: string | undefined;
}

export interface UserInfo {
  email: string | null;
  nickname: string | null;
}
