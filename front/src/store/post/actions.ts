import { createAction, createAsyncAction } from 'typesafe-actions';
import { UploadedContent } from './types';

export const UPLOAD = 'post/UPLOAD';
export const UPLOAD_SUCCESS = 'post/UPLOAD_SUCCESS';
export const UPLOAD_ERROR = 'post/UPLOAD_ERROR';

export const REORDER_UPLOADED = 'post/REORDER_UPLOADED';

export const uploadAsync = createAsyncAction(
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR
)<FormData, ResponseData, ResponseData>();

export const reorderUploaded = createAction(
  REORDER_UPLOADED,
  (newUploadedContent: UploadedContent[]) => newUploadedContent
)();
