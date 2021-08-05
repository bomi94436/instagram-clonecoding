import React, { useCallback } from 'react';
import {
  deleteCommentAsync,
  likeCommentAsync,
  unlikeCommentAsync,
} from '../../store/post/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { Comment } from '../../store/post/types';
import PostDetailComment from '../../components/PostDetail/PostDetailComment';
import { RootState } from '../../store';

interface props {
  postId: number;
  comment: Comment;
  onClickReply: (replyId: number | undefined, nickname: string) => void;
}

const PostDetailCommentContainer = ({
  location,
  postId,
  comment,
  onClickReply,
}: props &
  RouteComponentProps<
    {},
    StaticContext,
    { postDetail: any; mode: 'home' | 'explore' }
  >) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user.id);

  const onClickDeleteComment = useCallback(
    (postId: number, commentId: number) => {
      dispatch(
        deleteCommentAsync.request({
          postId,
          commentId,
          mode: location.state.mode,
        })
      );
    },
    [dispatch, location.state.mode]
  );

  const onClickLikeComment = useCallback(
    (commentId: number) => {
      dispatch(
        likeCommentAsync.request({ commentId, mode: location.state.mode })
      );
    },
    [dispatch, location.state.mode]
  );

  const onClickUnlikeComment = useCallback(
    (commentId: number) => {
      dispatch(
        unlikeCommentAsync.request({ commentId, mode: location.state.mode })
      );
    },
    [dispatch, location.state.mode]
  );

  return (
    <PostDetailComment
      userId={userId}
      postId={postId}
      comment={comment}
      onClickReply={onClickReply}
      onClickDeleteComment={onClickDeleteComment}
      onClickLikeComment={onClickLikeComment}
      onClickUnlikeComment={onClickUnlikeComment}
    />
  );
};

export default withRouter(PostDetailCommentContainer);
