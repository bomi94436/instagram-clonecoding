import { createAction, createAsyncAction } from 'typesafe-actions';
import { Picture, PostData } from './types';

export const UPLOAD_PICTURE = 'post/UPLOAD_PICTURE';
export const UPLOAD_PICTURE_SUCCESS = 'post/UPLOAD_PICTURE_SUCCESS';
export const UPLOAD_PICTURE_ERROR = 'post/UPLOAD_PICTURE_ERROR';

export const ADD_POST = 'post/ADD_POST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_ERROR = 'post/ADD_POST_ERROR';

export const REORDER_UPLOADED = 'post/REORDER_UPLOADED';
export const REMOVE_PICTURE = 'post/REMOVE_PICTURE';

export const uploadPictureAsync = createAsyncAction(
  UPLOAD_PICTURE,
  UPLOAD_PICTURE_SUCCESS,
  UPLOAD_PICTURE_ERROR
)<FormData, ResponseData, ResponseData>();

export const addPostAsync = createAsyncAction(
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR
)<PostData, ResponseData, ResponseData>();

export const reorderPicture = createAction(
  REORDER_UPLOADED,
  (reorderPicture: Picture[]) => reorderPicture
)();

export const removePicture = createAction(
  REMOVE_PICTURE,
  (pictureId: number) => pictureId
)();
