import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  UploadedPicture,
  createPostData,
  readHomePostParams,
  readPostParams,
  createCommentData,
  Post,
  deleteCommentData,
  deletePostData,
} from './types';

export const UPLOAD_PICTURE = 'post/UPLOAD_PICTURE';
export const UPLOAD_PICTURE_SUCCESS = 'post/UPLOAD_PICTURE_SUCCESS';
export const UPLOAD_PICTURE_ERROR = 'post/UPLOAD_PICTURE_ERROR';

export const CREATE_POST = 'post/CREATE_POST';
export const CREATE_POST_SUCCESS = 'post/CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'post/CREATE_POST_ERROR';

export const CREATE_COMMENT = 'post/CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'post/CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'post/CREATE_COMMENT_ERROR';

export const READ_HOME_POST = 'post/READ_HOME_POST';
export const READ_HOME_POST_SUCCESS = 'post/READ_HOME_POST_SUCCESS';
export const READ_HOME_POST_ERROR = 'post/READ_HOME_POST_ERROR';

export const READ_POST = 'post/READ_POST';
export const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS';
export const READ_POST_ERROR = 'post/READ_POST_ERROR';

export const DELETE_POST = 'post/DELETE_POST';
export const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
export const DELETE_POST_ERROR = 'post/DELETE_POST_ERROR';

export const DELETE_COMMENT = 'post/DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'post/DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'post/DELETE_COMMENT_ERROR';

export const REORDER_UPLOADED = 'post/REORDER_UPLOADED';
export const DELETE_PICTURE = 'post/DELETE_PICTURE';

export const INCREASE_LIKE_POST = 'post/INCREASE_LIKE_POST';
export const DECREASE_LIKE_POST = 'post/DECREASE_LIKE_POST';

export const CLEAR_CREATE_COMMENT = 'post/CLEAR_CREATE_COMMENT';

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

export const createCommentAsync = createAsyncAction(
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR
)<createCommentData, ResponseData, ResponseData>();

export const readHomePostAsync = createAsyncAction(
  READ_HOME_POST,
  READ_HOME_POST_SUCCESS,
  READ_HOME_POST_ERROR
)<readHomePostParams, ResponseData<Post>, ResponseData>();

export const readPostAsync = createAsyncAction(
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_ERROR
)<readPostParams, ResponseData<Post>, ResponseData>();

export const deletePostAsync = createAsyncAction(
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
)<deletePostData, ResponseData, ResponseData>();

export const deleteCommentAsync = createAsyncAction(
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR
)<deleteCommentData, ResponseData, ResponseData>();

export const reorderPicture = createAction(
  REORDER_UPLOADED,
  (reorderPicture: UploadedPicture[]) => reorderPicture
)();

export const deletePicture = createAction(
  DELETE_PICTURE,
  (pictureId: number) => pictureId
)();

export const increaseLikePost = createAction(
  INCREASE_LIKE_POST,
  (postId: number, mode: 'home' | 'explore') => ({ postId, mode })
)();

export const decreaseLikePost = createAction(
  DECREASE_LIKE_POST,
  (postId: number, mode: 'home' | 'explore') => ({ postId, mode })
)();

export const clearCreateComment = createAction(CLEAR_CREATE_COMMENT)();
