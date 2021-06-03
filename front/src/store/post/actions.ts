import { createAsyncAction } from 'typesafe-actions';

export const UPLOAD = 'post/UPLOAD';
export const UPLOAD_SUCCESS = 'post/UPLOAD_SUCCESS';
export const UPLOAD_ERROR = 'post/UPLOAD_ERROR';

export const uploadAsync = createAsyncAction(
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR
)<FormData, ResponseData, ResponseData>();
