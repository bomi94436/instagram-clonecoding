import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  loginAsync,
  logoutAsync,
  SIGN_UP,
  signUpAsync,
  SILENT_REFRESH,
  silentRefreshAsync,
  LOGOUT,
  getUserInfoAsync,
  GET_USER_INFO,
} from './actions';
import { LoginData, SignUpData } from './types';
import history from '../../lib/history';

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

const getUserInfoAPI = (params: { nickname: string }) =>
  axios.get(`/users/${params.nickname}`);

function* getUserInfoSaga(action: ReturnType<typeof getUserInfoAsync.request>) {
  try {
    const response: AxiosResponse = yield call(getUserInfoAPI, action.payload);
    yield put(getUserInfoAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(getUserInfoAsync.failure(e.response.data));
  }
}

export function* authSaga() {
  yield takeLatest(SIGN_UP, signUpSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeEvery(SILENT_REFRESH, silentRefreshSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(GET_USER_INFO, getUserInfoSaga);
}
