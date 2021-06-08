import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_POST,
  createPostAsync,
  UPLOAD_PICTURE,
  uploadPictureAsync,
  readPostAsync,
  READ_POST,
} from './actions';
import { createPostData, readPostParams } from './types';
import history from '../../lib/history';

const uploadAPI = (data: FormData) => axios.post('/posts/pictures', data);

function* uploadSaga(action: ReturnType<typeof uploadPictureAsync.request>) {
  try {
    const response: AxiosResponse = yield call(uploadAPI, action.payload);
    yield put(uploadPictureAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(uploadPictureAsync.failure(e.response.data));
  }
}

const createPostAPI = (data: createPostData) => axios.post('/posts', data);

function* createPostSaga(action: ReturnType<typeof createPostAsync.request>) {
  try {
    const response: AxiosResponse = yield call(createPostAPI, action.payload);
    yield put(createPostAsync.success(response.data));
    alert(response.data.message);
    history.push('/');
  } catch (e) {
    alert(e.response.data.message);
    yield put(createPostAsync.failure(e.response.data));
  }
}

const readPostAPI = (params: readPostParams) => axios.get('/posts', { params });

function* readPostSaga(action: ReturnType<typeof readPostAsync.request>) {
  try {
    const response: AxiosResponse = yield call(readPostAPI, action.payload);
    yield put(readPostAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(readPostAsync.failure(e.response.data));
  }
}

export function* postSaga() {
  yield takeEvery(UPLOAD_PICTURE, uploadSaga);
  yield takeEvery(CREATE_POST, createPostSaga);
  yield takeEvery(READ_POST, readPostSaga);
}
