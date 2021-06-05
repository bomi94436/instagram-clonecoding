import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import { reorderUploaded, uploadAsync } from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
  uploadedSrc: UploadedContent[];
};

export type PostAction = ActionType<
  typeof uploadAsync | typeof reorderUploaded
>;

export interface UploadedContent {
  id: number;
  type: string;
  src: string;
}

export interface ResponseUploadedContent {
  type: string;
  src: string;
}
