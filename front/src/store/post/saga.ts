import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { UPLOAD, uploadAsync } from './actions';

const uploadAPI = (data: FormData) => axios.post('/post/upload', data);

function* uploadSaga(action: ReturnType<typeof uploadAsync.request>) {
  try {
    const response: AxiosResponse = yield call(uploadAPI, action.payload);
    yield put(uploadAsync.success(response.data));
  } catch (e) {
    yield put(uploadAsync.failure(e.response.data));
  }
}

export function* postSaga() {
  yield takeEvery(UPLOAD, uploadSaga);
}
