import React, { useCallback, useEffect, useRef } from 'react';
import PostDetailModal from '../../components/common/PostDetailModal';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Post } from '../../store/post/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createCommentAsync } from '../../store/post/actions';

interface props {
  mode: 'home' | 'explore';
  post: Post;
}

const PostDetailModalContainer = ({
  history,
  mode,
  post,
}: props & RouteComponentProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const index = useSelector((state: RootState) =>
    state.post.readPost.data?.data.findIndex(
      (findPost: Post) => findPost.id === post.id
    )
  );
  const prevPost: Post | undefined = useSelector((state: RootState) =>
    mode === 'explore'
      ? state.post.readPost.data?.data.find(
          (findPost: Post, findIndex: number) => findIndex === index - 1
        )
      : undefined
  );
  const nextPost: Post | undefined = useSelector((state: RootState) =>
    mode === 'explore'
      ? state.post.readPost.data?.data.find(
          (findPost: Post, findIndex: number) => findIndex === index + 1
        )
      : undefined
  );

  const handleClickOutside = useCallback(
    (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        e.stopPropagation();
        history.goBack();
      }
    },
    [history]
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [handleClickOutside]);

  return (
    <PostDetailModal
      userId={userId}
      post={post}
      prevPost={prevPost}
      nextPost={nextPost}
      handleClickOutside={handleClickOutside}
      modalRef={modalRef}
      onSubmitComment={onSubmitComment}
    />
  );
};

export default withRouter(PostDetailModalContainer);
