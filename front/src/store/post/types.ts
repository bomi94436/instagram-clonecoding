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
  deletePostAsync,
  likePostAsync,
  unlikePostAsync,
  likeCommentAsync,
  unlikeCommentAsync,
} from './actions';

export type PostState = {
  upload: AsyncState<ResponseData, ResponseData>;
  likePost: AsyncState<ResponseData, ResponseData>;
  unlikePost: AsyncState<ResponseData, ResponseData>;
  likeComment: AsyncState<ResponseData, ResponseData>;
  unlikeComment: AsyncState<ResponseData, ResponseData>;
  createPost: AsyncState<ResponseData, ResponseData>;
  createComment: AsyncState<ResponseData, ResponseData>;
  readHomePost: AsyncState<ResponseData, ResponseData>;
  readPost: AsyncState<ResponseData, ResponseData>;
  deletePost: AsyncState<ResponseData, ResponseData>;
  deleteComment: AsyncState<ResponseData, ResponseData>;
  uploadedPicture: UploadedPicture[];
};

export type PostAction = ActionType<
  | typeof uploadPictureAsync
  | typeof likePostAsync
  | typeof unlikePostAsync
  | typeof likeCommentAsync
  | typeof unlikeCommentAsync
  | typeof createPostAsync
  | typeof createCommentAsync
  | typeof readHomePostAsync
  | typeof readPostAsync
  | typeof deletePostAsync
  | typeof deleteCommentAsync
  | typeof reorderPicture
  | typeof deletePicture
  | typeof clearCreateComment
>;

interface User {
  id: number;
  nickname: string;
  profile?: string;
}

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

export interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: Date;
  replyId?: number;
  likedUser: { userId: number }[];
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

export interface createCommentData extends Mode {
  postId: number;
  content: string;
  replyId?: number;
}

export interface deletePostData extends Mode {
  postId: number;
}

export interface deleteCommentData extends Mode {
  postId: number;
  commentId: number;
}
