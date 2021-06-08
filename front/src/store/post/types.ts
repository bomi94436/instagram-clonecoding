import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  uploadPictureAsync,
  reorderPicture,
  createPostAsync,
  deletePicture,
  readPostAsync,
} from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
  createPost: AsyncState<ResponseData>;
  readPost: AsyncState<ResponseData>;
  picture: Picture[];
};

export type PostAction = ActionType<
  | typeof uploadPictureAsync
  | typeof createPostAsync
  | typeof readPostAsync
  | typeof reorderPicture
  | typeof deletePicture
>;

export interface ResponsePicture {
  type: string;
  size: number;
  ext: string;
  src: string;
}

export interface Picture extends ResponsePicture {
  id: number;
}

export interface createPostData {
  content: string;
  picture: Picture[];
}

export interface readPostParams {
  lastId?: number;
  search?: string;
}
