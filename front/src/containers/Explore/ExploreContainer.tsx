import React, { useEffect } from 'react';
import { Explore } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { readPostAsync } from '../../store/post/actions';
import { RootState } from '../../store';
import useInfiniteScroll from '../../lib/hooks/useInfiniteScroll';

const ExploreContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.explorePost);
  const isLoadingExplorePost = useSelector(
    (state: RootState) => state.post.readPost.loading
  );
  const explorePostResponse = useSelector(
    (state: RootState) => state.post.readPost.data?.data
  );
  useInfiniteScroll(
    posts,
    isLoadingExplorePost,
    explorePostResponse,
    readPostAsync
  );

  useEffect(() => {
    !posts.length && dispatch(readPostAsync.request({}));
  }, [dispatch, posts]);

  return <Explore posts={posts} />;
};

export default ExploreContainer;
