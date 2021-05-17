import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import { signUpAsync } from './actions';

export type AuthState = {
  signup: AsyncState<ResponseData, ResponseData>;
};

export type AuthAction = ActionType<typeof signUpAsync>;
