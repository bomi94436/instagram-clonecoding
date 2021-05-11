import { ResponseData } from '../types';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SIGN_UP, signUpAsync } from './actions';
import { SignUpData } from './types';

const signUpAPI = (data: SignUpData) => axios.post('/user', data);

function* signUpSaga(action: ReturnType<typeof signUpAsync.request>) {
  try {
    const response: ResponseData = yield call(signUpAPI, action.payload);
    yield put(signUpAsync.success(response));
  } catch (e) {
    yield put(signUpAsync.failure(e));
  }
}

export function* authSaga() {
  yield takeEvery(SIGN_UP, signUpSaga);
}
