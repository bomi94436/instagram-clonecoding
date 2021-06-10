import { createAction, createAsyncAction } from 'typesafe-actions';
import { Picture, createPostData, readHomePostParams } from './types';

export const UPLOAD_PICTURE = 'post/UPLOAD_PICTURE';
export const UPLOAD_PICTURE_SUCCESS = 'post/UPLOAD_PICTURE_SUCCESS';
export const UPLOAD_PICTURE_ERROR = 'post/UPLOAD_PICTURE_ERROR';

export const CREATE_POST = 'post/CREATE_POST';
export const CREATE_POST_SUCCESS = 'post/CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'post/CREATE_POST_ERROR';

export const READ_HOME_POST = 'post/READ_HOME_POST';
export const READ_HOME_POST_SUCCESS = 'post/READ_HOME_POST_SUCCESS';
export const READ_HOME_POST_ERROR = 'post/READ_HOME_POST_ERROR';

export const REORDER_UPLOADED = 'post/REORDER_UPLOADED';
export const DELETE_PICTURE = 'post/DELETE_PICTURE';

export const uploadPictureAsync = createAsyncAction(
  UPLOAD_PICTURE,
  UPLOAD_PICTURE_SUCCESS,
  UPLOAD_PICTURE_ERROR
)<FormData, ResponseData, ResponseData>();

export const createPostAsync = createAsyncAction(
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR
)<createPostData, ResponseData, ResponseData>();

export const readHomePostAsync = createAsyncAction(
  READ_HOME_POST,
  READ_HOME_POST_SUCCESS,
  READ_HOME_POST_ERROR
)<readHomePostParams, ResponseData, ResponseData>();

export const reorderPicture = createAction(
  REORDER_UPLOADED,
  (reorderPicture: Picture[]) => reorderPicture
)();

export const deletePicture = createAction(
  DELETE_PICTURE,
  (pictureId: number) => pictureId
)();
