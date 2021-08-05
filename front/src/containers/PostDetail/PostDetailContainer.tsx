import React, { useCallback, useEffect, useRef } from 'react';
import {
  createCommentAsync,
  deletePostAsync,
  likePostAsync,
  unlikePostAsync,
} from '../../store/post/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext, withRouter } from 'react-router';
import HomePostDetailContainer from './HomePostDetailContainer';
import ExplorePostDetailContainer from './ExplorePostDetailContainer';
import { RootState } from '../../store';

const PostDetailContainer = ({
  history,
  location,
}: RouteComponentProps<
  {},
  StaticContext,
  { postDetail: any; mode: 'home' | 'explore' }
>) => {
  const dispatch = useDispatch();
  const likedPost = useSelector(
    (state: RootState) => state.auth.user.likedPost
  );
  const isCommentLoading = useSelector(
    (state: RootState) => state.post.createComment.loading
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        e.stopPropagation();
        history.goBack();
      }
    },
    [history]
  );

  const onClickLike = useCallback(
    (postId: number) => {
      dispatch(likePostAsync.request({ postId, mode: location.state.mode }));
    },
    [dispatch, location.state.mode]
  );

  const onClickUnlike = useCallback(
    (postId: number) => {
      dispatch(unlikePostAsync.request({ postId, mode: location.state.mode }));
    },
    [dispatch, location.state.mode]
  );

  const onClickDeletePost = useCallback(
    (postId: number) => {
      dispatch(deletePostAsync.request({ postId, mode: location.state.mode }));
      history.goBack();
    },
    [dispatch, history, location.state.mode]
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
    if (isCommentLoading === false) {
      contentRef.current?.scrollTo(
        0,
        contentRef.current?.scrollHeight - contentRef.current?.clientHeight
      );
    }
  }, [isCommentLoading]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (location.state.mode === 'home')
    return (
      <HomePostDetailContainer
        modalRef={modalRef}
        contentRef={contentRef}
        handleClickOutside={handleClickOutside}
        likedPost={likedPost}
        onClickLike={onClickLike}
        onClickUnlike={onClickUnlike}
        onClickDeletePost={onClickDeletePost}
        onSubmitComment={onSubmitComment}
      />
    );
  else
    return (
      <ExplorePostDetailContainer
        modalRef={modalRef}
        contentRef={contentRef}
        handleClickOutside={handleClickOutside}
        likedPost={likedPost}
        onClickLike={onClickLike}
        onClickUnlike={onClickUnlike}
        onClickDeletePost={onClickDeletePost}
        onSubmitComment={onSubmitComment}
      />
    );
};

export default withRouter(PostDetailContainer);
