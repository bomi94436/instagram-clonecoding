import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN, loginAsync, SIGN_UP, signUpAsync } from './actions';
import { LoginData, SignUpData } from './types';

const signUpAPI = (data: SignUpData) => axios.post('/user', data);

function* signUpSaga(action: ReturnType<typeof signUpAsync.request>) {
  try {
    const response: AxiosResponse = yield call(signUpAPI, action.payload);
    yield put(signUpAsync.success(response.data));
  } catch (e) {
    yield put(signUpAsync.failure(e.response.data));
  }
}

const loginAPI = (data: LoginData) => axios.post('/user/login', data);

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    const response: AxiosResponse = yield call(loginAPI, action.payload);
    axios.defaults.headers.common[
      'x-access-token'
    ] = `${response.data.data.token}`;
    yield put(loginAsync.success(response.data));
  } catch (e) {
    yield put(loginAsync.failure(e.response.data));
  }
}

export function* authSaga() {
  yield takeEvery(SIGN_UP, signUpSaga);
  yield takeEvery(LOGIN, loginSaga);
}
