import produce from 'immer';
import { asyncState } from '../../lib/reducerUtils';
import { AuthAction, AuthState } from './types';

const initialState: AuthState = {
  signup: asyncState.initial(),
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
    }
  });

export default auth;
