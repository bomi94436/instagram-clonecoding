import { AsyncState } from '../../lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import {
  uploadPictureAsync,
  reorderPicture,
  createPostAsync,
  deletePicture,
  readHomePostAsync,
  readPostAsync,
  createCommentAsync,
  clearCreateComment,
  deleteCommentAsync,
  increaseLikePost,
  decreaseLikePost,
} from './actions';

export type PostState = {
  upload: AsyncState<ResponseData, ResponseData>;
  createPost: AsyncState<ResponseData, ResponseData>;
  createComment: AsyncState<ResponseData, ResponseData>;
  deleteComment: AsyncState<ResponseData, ResponseData>;
  readHomePost: AsyncState<ResponseData, ResponseData>;
  readPost: AsyncState<ResponseData, ResponseData>;
  uploadedPicture: UploadedPicture[];
};

export type PostAction = ActionType<
  | typeof uploadPictureAsync
  | typeof createPostAsync
  | typeof createCommentAsync
  | typeof deleteCommentAsync
  | typeof readHomePostAsync
  | typeof readPostAsync
  | typeof reorderPicture
  | typeof deletePicture
  | typeof increaseLikePost
  | typeof decreaseLikePost
  | typeof clearCreateComment
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

interface User {
  id: number;
  nickname: string;
  profile?: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: Date;
  replyId?: number;
  replies: Comment[];
}

export interface Post {
  id: number;
  content: string;
  likeCount: number;
  createdAt: Date;
  user: User;
  pictures: Picture[];
  comments: Comment[];
}

export interface createCommentData {
  postId: number;
  content: string;
  replyId?: number;
  mode?: 'home' | 'explore';
}

export interface deleteCommentData {
  postId: number;
  commentId: number;
  mode?: 'home' | 'explore';
}
