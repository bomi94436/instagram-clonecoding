import React from 'react';
import Card from '../../components/Home/Card';
import { Post } from '../../store/post/types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { likePostAsync, unlikePostAsync } from '../../store/auth/actions';
import { RootState } from '../../store';

interface props {
  post: Post;
}

const CardContainer = ({ post }: props) => {
  const dispatch = useDispatch();
  const likedPost = useSelector(
    (state: RootState) => state.auth.user.likedPost
  );

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

  return (
    <Card
      post={post}
      likedPost={likedPost}
      onClickLike={onClickLike}
      onClickUnlike={onClickUnlike}
    />
  );
};

export default CardContainer;
