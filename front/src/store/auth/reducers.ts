import produce from 'immer';
import { asyncState } from '../../lib/reducerUtils';
import { AuthAction, AuthState } from './types';

const initialState: AuthState = {
  user: {
    email: null,
    nickname: null,
  },
  signup: asyncState.initial(),
  login: asyncState.initial(),
};

const auth = (state: AuthState = initialState, action: AuthAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'auth/SIGN_UP':
        draft.signup = asyncState.loading();
        break;
      case 'auth/SIGN_UP_SUCCESS':
        draft.signup = asyncState.success(action.payload);
        break;
      case 'auth/SIGN_UP_ERROR':
        draft.signup = asyncState.error(action.payload);
        break;

      case 'auth/LOGIN':
        draft.login = asyncState.loading();
        break;
      case 'auth/LOGIN_SUCCESS':
        draft.login = asyncState.success(null);
        draft.user = action.payload.data.info;
        break;
      case 'auth/LOGIN_ERROR':
        draft.login = asyncState.error(action.payload);
    }
  });

export default auth;
