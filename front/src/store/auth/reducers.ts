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
  likePost: asyncState.initial(),
  unlikePost: asyncState.initial(),
  logout: asyncState.initial(),
  getUserStatus: asyncState.initial(),
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

      case 'auth/LIKE_POST':
        draft.likePost = asyncState.loading();
        break;
      case 'auth/LIKE_POST_SUCCESS':
        draft.likePost = asyncState.success(action.payload);
        draft.user.likedPost.push({
          postId: Number(action.payload.data.postId),
        });
        break;
      case 'auth/LIKE_POST_ERROR':
        draft.likePost = asyncState.error(action.payload);
        break;

      case 'auth/UNLIKE_POST':
        draft.unlikePost = asyncState.loading();
        break;
      case 'auth/UNLIKE_POST_SUCCESS':
        draft.unlikePost = asyncState.success(action.payload);
        draft.user.likedPost = draft.user.likedPost.filter(
          (v) => v.postId !== Number(action.payload.data.postId)
        );
        break;
      case 'auth/UNLIKE_POST_ERROR':
        draft.unlikePost = asyncState.error(action.payload);
        break;

      case 'auth/GET_USER_STATUS':
        draft.getUserStatus = asyncState.loading();
        break;
      case 'auth/GET_USER_STATUS_SUCCESS':
        draft.getUserStatus = asyncState.success(action.payload);
        draft.user = action.payload.data;
        break;
      case 'auth/GET_USER_STATUS_ERROR':
        draft.getUserStatus = asyncState.error(action.payload);
        break;

      case 'auth/SET_AUTO_LOGIN':
        draft.timer = action.payload.timer;
        break;
      case 'auth/CLEAR_AUTO_LOGIN':
        clearInterval(draft.timer as NodeJS.Timeout);
        draft.timer = null;
        break;
    }
  });

export default auth;
