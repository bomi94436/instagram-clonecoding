import React from 'react';
import PostDetail from '../../components/PostDetail/PostDetail';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Post } from '../../store/post/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface props {
  modalRef: React.RefObject<HTMLDivElement>;
  handleClickOutside: (e: any) => void;
  onSubmitComment: (
    e: React.FormEvent<HTMLFormElement>
  ) => (postId: number, content: string, replyId?: number | undefined) => void;
}

const ExplorePostDetailContainer = ({
  match,
  modalRef,
  handleClickOutside,
  onSubmitComment,
}: props & RouteComponentProps<{ postId: string }>) => {
  const postId = Number(match.params.postId);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const post = useSelector((state: RootState) =>
    state.post.readPost.data?.data.find(
      (findPost: Post) => findPost.id === postId
    )
  );
  const postIndex = useSelector((state: RootState) =>
    state.post.readPost.data?.data.findIndex(
      (findPost: Post) => findPost.id === postId
    )
  );
  const prevPost: Post | undefined = useSelector((state: RootState) =>
    state.post.readPost.data?.data.find(
      (findPost: Post, findIndex: number) => findIndex === postIndex - 1
    )
  );
  const nextPost: Post | undefined = useSelector((state: RootState) =>
    state.post.readPost.data?.data.find(
      (findPost: Post, findIndex: number) => findIndex === postIndex + 1
    )
  );

  return (
    <PostDetail
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

export default withRouter(ExplorePostDetailContainer);
