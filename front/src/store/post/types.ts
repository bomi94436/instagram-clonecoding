import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  uploadPictureAsync,
  reorderPicture,
  addPostAsync,
  removePicture,
} from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
  addPost: AsyncState<ResponseData>;
  picture: Picture[];
};

export type PostAction = ActionType<
  | typeof uploadPictureAsync
  | typeof reorderPicture
  | typeof addPostAsync
  | typeof removePicture
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

export interface PostData {
  content: string;
  picture: Picture[];
}
