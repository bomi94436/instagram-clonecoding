import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_POST,
  addPostAsync,
  UPLOAD_PICTURE,
  uploadPictureAsync,
} from './actions';
import { PostData } from './types';
import history from '../../lib/history';

const uploadAPI = (data: FormData) => axios.post('/posts/pictures', data);

function* uploadSaga(action: ReturnType<typeof uploadPictureAsync.request>) {
  try {
    const response: AxiosResponse = yield call(uploadAPI, action.payload);
    yield put(uploadPictureAsync.success(response.data));
  } catch (e) {
    yield put(uploadPictureAsync.failure(e.response.data));
  }
}

const addPostAPI = (data: PostData) => axios.post('/posts', data);

function* addPostSaga(action: ReturnType<typeof addPostAsync.request>) {
  try {
    const response: AxiosResponse = yield call(addPostAPI, action.payload);
    yield put(addPostAsync.success(response.data));
    alert(response.data.message);
    history.push('/');
  } catch (e) {
    yield put(addPostAsync.failure(e.response.data));
  }
}

export function* postSaga() {
  yield takeEvery(UPLOAD_PICTURE, uploadSaga);
  yield takeEvery(ADD_POST, addPostSaga);
}
