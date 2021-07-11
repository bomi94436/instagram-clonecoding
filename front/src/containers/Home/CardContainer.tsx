import React from 'react';
import Card from '../../components/Home/Card';
import { Post } from '../../store/post/types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../store';
import {
  createCommentAsync,
  deletePostAsync,
  likeCommentAsync,
  likePostAsync,
  unlikeCommentAsync,
  unlikePostAsync,
} from '../../store/post/actions';

interface props {
  post: Post;
}

const CardContainer = ({ post }: props) => {
  const dispatch = useDispatch();
  const likedPost = useSelector(
    (state: RootState) => state.auth.user.likedPost
  );
  const userId = useSelector((state: RootState) => state.auth.user.id);

  const onClickLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => (postId: number) => {
      dispatch(likePostAsync.request({ postId, mode: 'home' }));
    },
    [dispatch]
  );

  const onClickUnlike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => (postId: number) => {
      dispatch(unlikePostAsync.request({ postId, mode: 'home' }));
    },
    [dispatch]
  );

  const onClickLikeComment = useCallback(
    (commentId: number) => {
      dispatch(likeCommentAsync.request({ commentId, mode: 'home' }));
    },
    [dispatch]
  );

  const onClickUnlikeComment = useCallback(
    (commentId: number) => {
      dispatch(unlikeCommentAsync.request({ commentId, mode: 'home' }));
    },
    [dispatch]
  );

  const onClickDeletePost = useCallback(
    (postId: number) => {
      dispatch(deletePostAsync.request({ postId, mode: 'home' }));
    },
    [dispatch]
  );

  const onSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => (
      postId: number,
      content: string,
      replyId?: number
    ) => {
      e.preventDefault();
      dispatch(
        createCommentAsync.request({
          postId,
          content,
          replyId,
          mode: 'home',
        })
      );
    },
    [dispatch]
  );

  return (
    <Card
      userId={userId}
      post={post}
      likedPost={likedPost}
      onClickLike={onClickLike}
      onClickUnlike={onClickUnlike}
      onClickLikeComment={onClickLikeComment}
      onClickUnlikeComment={onClickUnlikeComment}
      onClickDeletePost={onClickDeletePost}
      onSubmitComment={onSubmitComment}
    />
  );
};

export default CardContainer;
