import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  CREATE_POST,
  createPostAsync,
  UPLOAD_PICTURE,
  uploadPictureAsync,
  readHomePostAsync,
  READ_HOME_POST,
  readPostAsync,
  READ_POST,
  createCommentAsync,
  CREATE_COMMENT,
} from './actions';
import {
  createCommentData,
  createPostData,
  readHomePostParams,
  readPostParams,
} from './types';
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

const createCommentAPI = (data: createCommentData) =>
  axios.post(`/posts/${data.postId}/comment`, {
    content: data.content,
    replyId: data.replyId,
  });

function* createCommentSaga(
  action: ReturnType<typeof createCommentAsync.request>
) {
  try {
    const response: AxiosResponse = yield call(
      createCommentAPI,
      action.payload
    );
    yield put(createCommentAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(createCommentAsync.failure(e.response.data));
  }
}

const readHomePostAPI = (params: readHomePostParams) =>
  axios.get('/posts/following', { params });

function* readHomePostSaga(
  action: ReturnType<typeof readHomePostAsync.request>
) {
  try {
    const response: AxiosResponse = yield call(readHomePostAPI, action.payload);
    yield put(readHomePostAsync.success(response.data));
  } catch (e) {
    alert(e.response.data.message);
    yield put(readHomePostAsync.failure(e.response.data));
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
  yield takeLatest(UPLOAD_PICTURE, uploadSaga);
  yield takeLatest(CREATE_POST, createPostSaga);
  yield takeLatest(CREATE_COMMENT, createCommentSaga);
  yield takeEvery(READ_HOME_POST, readHomePostSaga);
  yield takeEvery(READ_POST, readPostSaga);
}
