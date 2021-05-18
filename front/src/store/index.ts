import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { authSaga } from './auth/sagas';
import auth from './auth/reducers';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([fork(authSaga)]);
}

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
