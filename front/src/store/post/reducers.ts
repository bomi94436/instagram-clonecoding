import { Comment, Post, PostAction, PostState, ResponsePicture } from './types';
import { asyncState } from '../../lib/reducerUtils';
import produce from 'immer';

const initialState: PostState = {
  upload: asyncState.initial(),
  likePost: asyncState.initial(),
  unlikePost: asyncState.initial(),
  likeComment: asyncState.initial(),
  unlikeComment: asyncState.initial(),
  createPost: asyncState.initial(),
  createComment: asyncState.initial(),
  readHomePost: asyncState.initial(),
  readPost: asyncState.initial(),
  deletePost: asyncState.initial(),
  deleteComment: asyncState.initial(),
  uploadedPicture: [],
  homePost: [],
  explorePost: [],
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

      case 'post/LIKE_POST':
        draft.likePost = asyncState.loading();
        break;
      case 'post/LIKE_POST_SUCCESS': {
        draft.likePost = asyncState.success(action.payload);
        const post =
          action.payload.mode === 'home'
            ? draft.homePost.find(
                (v: Post) => v.id === action.payload.data.postId
              )
            : draft.explorePost.find(
                (v: Post) => v.id === action.payload.data.postId
              );
        if (post) post.likeCount += 1;

        break;
      }
      case 'post/LIKE_POST_ERROR':
        draft.likePost = asyncState.error(action.payload);
        break;

      case 'post/UNLIKE_POST':
        draft.unlikePost = asyncState.loading();
        break;
      case 'post/UNLIKE_POST_SUCCESS': {
        draft.unlikePost = asyncState.success(action.payload);
        const post =
          action.payload.mode === 'home'
            ? draft.homePost.find(
                (v: Post) => v.id === action.payload.data.postId
              )
            : draft.explorePost.find(
                (v: Post) => v.id === action.payload.data.postId
              );
        if (post) post.likeCount -= 1;
        break;
      }
      case 'post/UNLIKE_POST_ERROR':
        draft.unlikePost = asyncState.error(action.payload);
        break;

      case 'post/LIKE_COMMENT':
        draft.likeComment = asyncState.loading();
        break;
      case 'post/LIKE_COMMENT_SUCCESS': {
        draft.likeComment = asyncState.success(action.payload);
        const post =
          action.payload.mode === 'home'
            ? draft.homePost.find(
                (v: Post) => v.id === action.payload.data.postId
              )
            : draft.explorePost.find(
                (v: Post) => v.id === action.payload.data.postId
              );

        post?.comments.forEach((comment: Comment) => {
          if (comment.id === action.payload.data.commentId) {
            comment.likedUser.push({ userId: action.payload.data.userId });
          }
          comment.replies?.forEach((reply: Comment) => {
            if (reply.id === action.payload.data.commentId) {
              reply.likedUser.push({ userId: action.payload.data.userId });
            }
          });
        });

        break;
      }
      case 'post/LIKE_COMMENT_ERROR':
        draft.likeComment = asyncState.error(action.payload);
        break;

      case 'post/UNLIKE_COMMENT':
        draft.unlikeComment = asyncState.loading();
        break;
      case 'post/UNLIKE_COMMENT_SUCCESS': {
        draft.unlikeComment = asyncState.success(action.payload);
        const post =
          action.payload.mode === 'home'
            ? draft.homePost.find(
                (v: Post) => v.id === action.payload.data.postId
              )
            : draft.explorePost.find(
                (v: Post) => v.id === action.payload.data.postId
              );

        post?.comments.forEach((comment: Comment) => {
          if (comment.id === action.payload.data.commentId) {
            comment.likedUser = comment.likedUser.filter(
              (v: { userId: number }) => v.userId !== action.payload.data.userId
            );
          }
          comment.replies?.forEach((reply: Comment) => {
            if (reply.id === action.payload.data.commentId) {
              reply.likedUser = reply.likedUser.filter(
                (v: { userId: number }) =>
                  v.userId !== action.payload.data.userId
              );
            }
          });
        });

        break;
      }
      case 'post/UNLIKE_COMMENT_ERROR':
        draft.unlikeComment = asyncState.error(action.payload);
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

          const post =
            action.payload.mode === 'home'
              ? draft.homePost.find(
                  (post: Post) => post.id === action.payload.data.postId
                )
              : draft.explorePost.find(
                  (post: Post) => post.id === action.payload.data.postId
                );

          if (action.payload.data.replyId) {
            const comment = post?.comments.find(
              (comment: Comment) => comment.id === action.payload.data.replyId
            );
            comment?.replies.push(action.payload.data);
          } else {
            post?.comments.push(action.payload.data);
          }
        }
        break;
      case 'post/CREATE_COMMENT_ERROR':
        draft.createComment = asyncState.error(action.payload);
        break;

      case 'post/READ_HOME_POST':
        draft.readHomePost = asyncState.loading();
        break;
      case 'post/READ_HOME_POST_SUCCESS': {
        const response: Post[] = action.payload.data;
        const posts: Post[] = draft.homePost;

        if (!action.payload.lastId) {
          draft.homePost = action.payload.data;
        } else if (
          !(
            response?.length &&
            posts?.length &&
            response[response.length - 1].id === posts[posts.length - 1].id
          )
        ) {
          draft.homePost = draft.homePost.concat(response);
        }

        draft.readHomePost = asyncState.success(action.payload);
        break;
      }
      case 'post/READ_HOME_POST_ERROR':
        draft.readHomePost = asyncState.error(action.payload);
        break;

      case 'post/READ_POST':
        draft.readPost = asyncState.loading(draft.readPost.data);
        break;
      case 'post/READ_POST_SUCCESS':
        const response: Post[] = action.payload.data;
        const posts: Post[] = draft.explorePost;

        if (!action.payload.lastId) {
          draft.explorePost = action.payload.data;
        } else if (
          !(
            response?.length &&
            posts?.length &&
            response[response.length - 1].id === posts[posts.length - 1].id
          )
        ) {
          draft.explorePost = draft.explorePost.concat(response);
        }

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
          draft.homePost.forEach(
            (post: Post, index: number) =>
              post.id === action.payload.data.postId &&
              draft.homePost.splice(index, 1)
          );
        } else {
          draft.explorePost.forEach(
            (post: Post, index: number) =>
              post.id === action.payload.data.postId &&
              draft.explorePost.splice(index, 1)
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
            ? draft.homePost.find(
                (post: Post) => post.id === action.payload.data.postId
              )
            : draft.explorePost.find(
                (post: Post) => post.id === action.payload.data.postId
              );

        post?.comments.forEach((comment: Comment, commentIndex: number) => {
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

      case 'post/CLEAR_CREATE_COMMENT':
        draft.createComment = asyncState.initial();
        break;
    }
  });

export default post;
