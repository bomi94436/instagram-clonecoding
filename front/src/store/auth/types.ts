import { AsyncState } from '../../lib/reducerUtils';
import { ResponseData } from '../types';
import { ActionType } from 'typesafe-actions';
import { signUpAsync } from './actions';

export declare interface SignUpData {
  email: string;
  password: string;
  nickname: string;
}

export type AuthState = {
  signup: AsyncState<ResponseData, Error>;
};

export type AuthAction = ActionType<typeof signUpAsync>;
