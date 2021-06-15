import React from 'react';
import Card from '../../components/Home/Card';
import { Post } from '../../store/post/types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { likePostAsync, unlikePostAsync } from '../../store/auth/actions';
import { RootState } from '../../store';
import { createCommentAsync } from '../../store/post/actions';

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
      dispatch(likePostAsync.request({ postId }));
    },
    [dispatch]
  );

  const onClickUnlike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => (postId: number) => {
      dispatch(unlikePostAsync.request({ postId }));
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
      onSubmitComment={onSubmitComment}
    />
  );
};

export default CardContainer;
