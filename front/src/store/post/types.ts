import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import { uploadPictureAsync, reorderPicture, addPostAsync } from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
  addPost: AsyncState<ResponseData>;
  picture: Picture[];
};

export type PostAction = ActionType<
  typeof uploadPictureAsync | typeof reorderPicture | typeof addPostAsync
>;

export interface ResponsePicture {
  type: string;
  size: number;
  src: string;
}

export interface Picture extends ResponsePicture {
  id: number;
}

export interface PostData {
  content: string;
  picture: { id: number; type: string; size: number; src: string }[];
}
