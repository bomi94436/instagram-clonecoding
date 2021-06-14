import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import {
  LOGIN,
  loginAsync,
  logoutAsync,
  SIGN_UP,
  signUpAsync,
  SILENT_REFRESH,
  silentRefreshAsync,
  LOGOUT,
  unlikePostAsync,
  likePostAsync,
  LIKE_POST,
  UNLIKE_POST,
  getUserStatusAsync,
  GET_USER_STATUS,
} from './actions';
import { LoginData, SignUpData } from './types';
import history from '../../lib/history';
import { decreaseLikePost, increaseLikePost } from '../post/actions';

const signUpAPI = (data: SignUpData) => axios.post('/users', data);

function* signUpSaga(action: ReturnType<typeof signUpAsync.request>) {
  try {
    const response: AxiosResponse = yield call(signUpAPI, action.payload);
    alert(response.data.message);
    history.push('/login');
    yield put(signUpAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(signUpAsync.failure(e.response.data));
  }
}

const loginAPI = (data: LoginData) => axios.post('/users/login', data);

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    const response: AxiosResponse = yield call(loginAPI, action.payload);
    axios.defaults.headers.common[
      'x-access-token'
    ] = `${response.data.data.token}`;
    yield put(loginAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(loginAsync.failure(e.response.data));
  }
}

const silentRefreshAPI = () => axios.get('/users/silent-refresh');

function* silentRefreshSaga() {
  try {
    const response: AxiosResponse = yield call(silentRefreshAPI);
    axios.defaults.headers.common[
      'x-access-token'
    ] = `${response.data.data.token}`;
    yield put(silentRefreshAsync.success(response.data));
  } catch (e) {
    yield put(silentRefreshAsync.failure(e.response.data));
  }
}

const logoutAPI = () => axios.get('/users/logout');

function* logoutSaga() {
  try {
    const response: AxiosResponse = yield call(logoutAPI);
    delete axios.defaults.headers.common['x-access-token'];
    yield put(logoutAsync.success(response.data));
  } catch (e) {
    yield put(logoutAsync.failure(e.response.data));
  }
}

const likePostAPI = (params: { postId: number }) =>
  axios.patch(`/posts/${params.postId}/like`);

function* likePostSaga(action: ReturnType<typeof likePostAsync.request>) {
  try {
    const response: AxiosResponse = yield call(likePostAPI, action.payload);
    yield put(likePostAsync.success(response.data));
    yield put(increaseLikePost(response.data.data.postId));
  } catch (e) {
    alert(e.response.data.message);
    yield put(likePostAsync.failure(e.response.data));
  }
}

const unlikePostAPI = (params: { postId: number }) =>
  axios.delete(`/posts/${params.postId}/like`);

function* unlikePostSaga(action: ReturnType<typeof unlikePostAsync.request>) {
  try {
    const response: AxiosResponse = yield call(unlikePostAPI, action.payload);
    yield put(unlikePostAsync.success(response.data));
    yield put(decreaseLikePost(response.data.data.postId));
  } catch (e) {
    alert(e.response.data.message);
    yield put(unlikePostAsync.failure(e.response.data));
  }
}

const getUserStatusAPI = () => axios.get(`/users/status`);

function* getUserStatusSaga(
  action: ReturnType<typeof getUserStatusAsync.request>
) {
  try {
    const response: AxiosResponse = yield call(getUserStatusAPI);
    yield put(getUserStatusAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(getUserStatusAsync.failure(e.response.data));
  }
}

export function* authSaga() {
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeEvery(SILENT_REFRESH, silentRefreshSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield throttle(2000, LIKE_POST, likePostSaga);
  yield throttle(2000, UNLIKE_POST, unlikePostSaga);
  yield takeEvery(GET_USER_STATUS, getUserStatusSaga);
}
