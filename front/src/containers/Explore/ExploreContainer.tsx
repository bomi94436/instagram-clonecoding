import React, { useEffect } from 'react';
import { Explore } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { readPostAsync } from '../../store/post/actions';
import { RootState } from '../../store';

const ExploreContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.readPost.data);

  useEffect(() => {
    dispatch(readPostAsync.request({}));
  }, []);
  return <Explore posts={posts?.data} />;
};

export default ExploreContainer;
