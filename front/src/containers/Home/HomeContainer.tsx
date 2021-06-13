import { Home } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readHomePostAsync } from '../../store/post/actions';
import { RootState } from '../../store';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootState) => state.post.readHomePost.data?.data
  );
  const profile = useSelector((state: RootState) => state.auth.user.profile);
  const nickname = useSelector((state: RootState) => state.auth.user.nickname);

  useEffect(() => {
    dispatch(readHomePostAsync.request({}));
  }, [dispatch]);

  return <Home profile={profile} nickname={nickname} posts={posts} />;
};

export default HomeContainer;
