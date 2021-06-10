import { Home } from '../../components';
import { UserInfo } from '../../store/auth/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readHomePostAsync } from '../../store/post/actions';
import { RootState } from '../../store';

interface props {
  user: UserInfo;
}

const HomeContainer = ({ user }: props) => {
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootState) => state.post.readHomePost.data?.data
  );

  useEffect(() => {
    dispatch(readHomePostAsync.request({}));
  }, [dispatch]);

  return <Home user={user} posts={posts} />;
};

export default HomeContainer;
