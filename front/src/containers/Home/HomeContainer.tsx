import { Home } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readHomePostAsync } from '../../store/post/actions';
import { RootState } from '../../store';
import { getUserStatusAsync } from '../../store/auth/actions';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootState) => state.post.readHomePost.data?.data
  );
  const { profile, nickname, postCount, followings, followers } = useSelector(
    (state: RootState) => state.auth.user
  );

  useEffect(() => {
    dispatch(readHomePostAsync.request({}));
    dispatch(getUserStatusAsync.request());
  }, [dispatch]);

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
