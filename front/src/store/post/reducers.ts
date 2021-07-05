import { Comment, Post, PostAction, PostState, ResponsePicture } from './types';
import { asyncState } from '../../lib/reducerUtils';
import produce from 'immer';

const initialState: PostState = {
  upload: asyncState.initial(),
  createPost: asyncState.initial(),
  createComment: asyncState.initial(),
  readHomePost: asyncState.initial(),
  readPost: asyncState.initial(),
  deletePost: asyncState.initial(),
  deleteComment: asyncState.initial(),
  uploadedPicture: [],
};

const post = (state: PostState = initialState, action: PostAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'post/UPLOAD_PICTURE':
        draft.upload = asyncState.loading();
        break;
      case 'post/UPLOAD_PICTURE_SUCCESS':
        draft.upload = asyncState.success(action.payload);
        action.payload.data.forEach((value: ResponsePicture) => {
          draft.uploadedPicture.push({
            id: draft.uploadedPicture.length + 1,
            type: value.type,
            size: value.size,
            ext: value.ext,
            src: value.src,
          });
        });
        break;
      case 'post/UPLOAD_PICTURE_ERROR':
        draft.upload = asyncState.error(action.payload);
        break;

      case 'post/REORDER_UPLOADED':
        draft.uploadedPicture = action.payload;
        break;

      case 'post/CREATE_POST':
        draft.createPost = asyncState.loading();
        break;
      case 'post/CREATE_POST_SUCCESS':
        draft.createPost = asyncState.success(action.payload);
        draft.uploadedPicture = [];
        break;
      case 'post/CREATE_POST_ERROR':
        draft.createPost = asyncState.error(action.payload);
        break;

      case 'post/CREATE_COMMENT':
        draft.createComment = asyncState.loading();
        break;
      case 'post/CREATE_COMMENT_SUCCESS':
        {
          draft.createComment = asyncState.success(action.payload);

          const post: Post =
            action.payload.mode === 'home'
              ? draft.readHomePost.data?.data.find(
                  (post: Post) => post.id === action.payload.data.postId
                )
              : draft.readPost.data?.data.find(
                  (post: Post) => post.id === action.payload.data.postId
                );

          if (action.payload.data.replyId) {
            const comment = post.comments.find(
              (comment: Comment) => comment.id === action.payload.data.replyId
            );
            comment?.replies.push(action.payload.data);
          } else {
            post.comments.push(action.payload.data);
          }
        }
        break;
      case 'post/CREATE_COMMENT_ERROR':
        draft.createComment = asyncState.error(action.payload);
        break;

      case 'post/READ_HOME_POST':
        draft.readHomePost = asyncState.loading(draft.readHomePost.data);
        break;
      case 'post/READ_HOME_POST_SUCCESS':
        draft.readHomePost = asyncState.success(action.payload);
        break;
      case 'post/READ_HOME_POST_ERROR':
        draft.readHomePost = asyncState.error(action.payload);
        break;

      case 'post/READ_POST':
        draft.readPost = asyncState.loading(draft.readPost.data);
        break;
      case 'post/READ_POST_SUCCESS':
        draft.readPost = asyncState.success(action.payload);
        break;
      case 'post/READ_POST_ERROR':
        draft.readPost = asyncState.error(action.payload);
        break;

      case 'post/DELETE_POST':
        draft.deletePost = asyncState.loading();
        break;
      case 'post/DELETE_POST_SUCCESS': {
        draft.deletePost = asyncState.success(action.payload);

        if (action.payload.mode === 'home') {
          draft.readHomePost.data?.data.forEach(
            (post: Post, index: number) =>
              post.id === action.payload.data.postId &&
              draft.readHomePost.data?.data.splice(index, 1)
          );
        }

        break;
      }
      case 'post/DELETE_POST_ERROR':
        draft.deletePost = asyncState.error(action.payload);
        break;

      case 'post/DELETE_COMMENT':
        draft.deleteComment = asyncState.loading();
        break;
      case 'post/DELETE_COMMENT_SUCCESS': {
        draft.deleteComment = asyncState.success(action.payload);

        const post =
          action.payload.mode === 'home'
            ? draft.readHomePost.data?.data.find(
                (post: Post) => post.id === action.payload.data.postId
              )
            : draft.readPost.data?.data.find(
                (post: Post) => post.id === action.payload.data.postId
              );

        post.comments.forEach((comment: Comment, commentIndex: number) => {
          if (
            comment.id === action.payload.data.commentId ||
            comment.replyId === action.payload.data.commentId
          ) {
            post.comments.splice(commentIndex, 1);
          }
          comment.replies?.forEach((reply: Comment, replyIndex: number) => {
            if (reply.id === action.payload.data.commentId) {
              comment.replies.splice(replyIndex, 1);
            }
          });
        });

        break;
      }

      case 'post/DELETE_COMMENT_ERROR':
        draft.deleteComment = asyncState.error(action.payload);
        break;

      case 'post/DELETE_PICTURE':
        draft.uploadedPicture = draft.uploadedPicture.filter(
          (v) => v.id !== action.payload
        );
        break;

      case 'post/INCREASE_LIKE_POST': {
        const post =
          action.payload.mode === 'home'
            ? draft.readHomePost.data?.data.find(
                (v: Post) => v.id === action.payload.postId
              )
            : draft.readPost.data?.data.find(
                (v: Post) => v.id === action.payload.postId
              );
        post.likeCount += 1;
        break;
      }
      case 'post/DECREASE_LIKE_POST': {
        const post =
          action.payload.mode === 'home'
            ? draft.readHomePost.data?.data.find(
                (v: Post) => v.id === action.payload.postId
              )
            : draft.readPost.data?.data.find(
                (v: Post) => v.id === action.payload.postId
              );
        post.likeCount -= 1;
        break;
      }

      case 'post/CLEAR_CREATE_COMMENT':
        draft.createComment = asyncState.initial();
        break;
    }
  });

export default post;
