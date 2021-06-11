import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  uploadPictureAsync,
  reorderPicture,
  createPostAsync,
  deletePicture,
  readHomePostAsync,
  readPostAsync,
} from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
  createPost: AsyncState<ResponseData>;
  readHomePost: AsyncState<ResponseData>;
  readPost: AsyncState<ResponseData>;
  picture: Picture[];
};

export type PostAction = ActionType<
  | typeof uploadPictureAsync
  | typeof createPostAsync
  | typeof readHomePostAsync
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

export interface readHomePostParams {
  lastId?: number;
}

export interface readPostParams extends readHomePostParams {
  search?: string;
}

export interface Post {
  id: number;
  content: string;
  pictures: {
    id: number;
    src: string;
    type: 'image' | 'video';
  }[];
  user: {
    id: number;
    nickname: string;
    profile?: string;
  };
}
