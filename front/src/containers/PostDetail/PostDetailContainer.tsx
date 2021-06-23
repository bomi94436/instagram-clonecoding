import React, { useCallback, useEffect, useRef } from 'react';
import { createCommentAsync } from '../../store/post/actions';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext, withRouter } from 'react-router';
import HomePostDetailContainer from './HomePostDetailContainer';
import ExplorePostDetailContainer from './ExplorePostDetailContainer';

const PostDetailContainer = ({
  history,
  location,
}: RouteComponentProps<
  {},
  StaticContext,
  { postDetail: any; mode: 'home' | 'explore' }
>) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

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
          mode: location.state.mode,
        })
      );
    },
    [dispatch, location.state.mode]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [handleClickOutside]);

  if (location.state.mode === 'home')
    return (
      <HomePostDetailContainer
        modalRef={modalRef}
        handleClickOutside={handleClickOutside}
        onSubmitComment={onSubmitComment}
      />
    );
  else
    return (
      <ExplorePostDetailContainer
        modalRef={modalRef}
        handleClickOutside={handleClickOutside}
        onSubmitComment={onSubmitComment}
      />
    );
};

export default withRouter(PostDetailContainer);
