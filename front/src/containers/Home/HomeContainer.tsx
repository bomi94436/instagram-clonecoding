import { Home } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readHomePostAsync } from '../../store/post/actions';
import { RootState } from '../../store';
import { getUserInfoAsync } from '../../store/auth/actions';
import { Post } from '../../store/post/types';
import useInfiniteScroll from '../../lib/hooks/useInfiniteScroll';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const posts: Post[] = useSelector((state: RootState) => state.post.homePost);
  const homePostResponse: Post[] = useSelector(
    (state: RootState) => state.post.readHomePost.data?.data
  );
  const isLoadingHomePost = useSelector(
    (state: RootState) => state.post.readHomePost.loading
  );
  const { profile, nickname, postCount, followings, followers } = useSelector(
    (state: RootState) => state.auth.user
  );
  useInfiniteScroll(
    posts,
    isLoadingHomePost,
    homePostResponse,
    readHomePostAsync
  );

  useEffect(() => {
    !posts.length && dispatch(readHomePostAsync.request({}));
    nickname && dispatch(getUserInfoAsync.request({ nickname }));
  }, [dispatch, nickname, posts]);

  return (
    <Home
      profile={profile}
      nickname={nickname}
      postCount={postCount}
      posts={posts}
      followings={followings}
      followers={followers}
    />
  );
};

export default HomeContainer;
