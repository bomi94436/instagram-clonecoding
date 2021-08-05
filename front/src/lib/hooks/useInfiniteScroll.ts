import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Post } from '../../store/post/types';

const useInfiniteScroll = (
  posts: Post[],
  isLoadingPost: boolean | null,
  postResponse: any,
  postAsync: any
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (!isLoadingPost) {
          dispatch(postAsync.request({ lastId: posts[posts.length - 1].id }));
        }
      }
    };
    window.addEventListener('scroll', onScroll);

    if (postResponse && !postResponse.length) {
      window.removeEventListener('scroll', onScroll);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, posts, isLoadingPost, postResponse, postAsync]);
};

export default useInfiniteScroll;
