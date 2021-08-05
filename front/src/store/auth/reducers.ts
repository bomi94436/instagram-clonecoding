import produce from 'immer';
import { asyncState } from '../../lib/reducerUtils';
import { AuthAction, AuthState } from './types';

const initialState: AuthState = {
  user: {
    id: null,
    email: null,
    nickname: null,
    profile: undefined,
    likedPost: [],
    postCount: null,
    followings: [],
    followers: [],
  },
  signup: asyncState.initial(),
  login: asyncState.initial(),
  silentRefresh: asyncState.initial(),
  logout: asyncState.initial(),
  getUserInfo: asyncState.initial(),
  timer: null,
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
        break;

      case 'auth/SILENT_REFRESH':
        draft.silentRefresh = asyncState.loading();
        break;
      case 'auth/SILENT_REFRESH_SUCCESS':
        draft.silentRefresh = asyncState.success(null);
        draft.user = action.payload.data.info;
        break;
      case 'auth/SILENT_REFRESH_ERROR':
        draft.silentRefresh = asyncState.error(action.payload);
        break;

      case 'auth/LOGOUT':
        draft.logout = asyncState.loading();
        break;
      case 'auth/LOGOUT_SUCCESS':
        draft.logout = asyncState.success(null);
        draft.user.email = null;
        draft.user.nickname = null;
        break;
      case 'auth/LOGOUT_ERROR':
        draft.logout = asyncState.error(action.payload);
        break;

      case 'auth/GET_USER_INFO':
        draft.getUserInfo = asyncState.loading();
        break;
      case 'auth/GET_USER_INFO_SUCCESS':
        draft.getUserInfo = asyncState.success(action.payload);
        draft.user = action.payload.data;
        break;
      case 'auth/GET_USER_INFO_ERROR':
        draft.getUserInfo = asyncState.error(action.payload);
        break;

      case 'auth/SET_AUTO_LOGIN':
        draft.timer = action.payload.timer;
        break;
      case 'auth/CLEAR_AUTO_LOGIN':
        clearInterval(draft.timer as NodeJS.Timeout);
        draft.timer = null;
        break;

      case 'auth/DECREASE_POST_COUNT':
        if (draft.user.postCount) draft.user.postCount -= 1;
        break;

      case 'auth/ADD_LIKED_POST':
        draft.user.likedPost.push({
          postId: Number(action.payload.postId),
        });
        break;
      case 'auth/REMOVE_LIKED_POST':
        draft.user.likedPost = draft.user.likedPost.filter(
          (v) => v.postId !== Number(action.payload.postId)
        );
        break;
    }
  });

export default auth;
