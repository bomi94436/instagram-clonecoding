import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SIGN_UP, signUpAsync } from './actions';

const signUpAPI = (data: SignUpData) => axios.post('/user', data);

function* signUpSaga(action: ReturnType<typeof signUpAsync.request>) {
  try {
    const response: AxiosResponse = yield call(signUpAPI, action.payload);
    yield put(signUpAsync.success(response.data));
  } catch (e) {
    yield put(signUpAsync.failure(e.response.data));
  }
}

export function* authSaga() {
  yield takeEvery(SIGN_UP, signUpSaga);
}
