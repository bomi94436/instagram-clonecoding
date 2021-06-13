import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  uploadPictureAsync,
  reorderPicture,
  createPostAsync,
  deletePicture,
  readHomePostAsync,
  readPostAsync,
  increaseLikePost,
  decreaseLikePost,
} from './actions';

export type PostState = {
  upload: AsyncState<ResponseData>;
  createPost: AsyncState<ResponseData>;
  readHomePost: AsyncState<ResponseData>;
  readPost: AsyncState<ResponseData>;
  uploadedPicture: UploadedPicture[];
};

export type PostAction = ActionType<
  | typeof uploadPictureAsync
  | typeof createPostAsync
  | typeof readHomePostAsync
  | typeof readPostAsync
  | typeof reorderPicture
  | typeof deletePicture
  | typeof increaseLikePost
  | typeof decreaseLikePost
>;

export interface ResponsePicture {
  type: string;
  size: number;
  ext: string;
  src: string;
}

export interface UploadedPicture extends ResponsePicture {
  id: number;
}

export interface createPostData {
  content: string;
  picture: UploadedPicture[];
}

export interface readHomePostParams {
  lastId?: number;
}

export interface readPostParams extends readHomePostParams {
  search?: string;
}

export interface Picture {
  id: number;
  src: string;
  type: 'image' | 'video';
}

export interface Post {
  id: number;
  content: string;
  likeCount: number;
  createdAt: Date;
  user: {
    id: number;
    nickname: string;
    profile?: string;
  };
  pictures: Picture[];
}
