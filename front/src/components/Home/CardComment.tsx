import React from 'react';
import { filterHashAndAt } from '../../lib/util';
import { StyledCardComment } from './styles';
import { BsHeart, BsHeartFill } from 'react-icons/all';
import { Link, useLocation } from 'react-router-dom';
import { Comment, Post } from '../../store/post/types';

interface props {
  userId: number | null;
  post: Post;
  comments: Comment[];
  onClickLikeComment: (commentId: number) => void;
  onClickUnlikeComment: (commentId: number) => void;
}

const CardComment = ({
  userId,
  post,
  comments,
  onClickLikeComment,
  onClickUnlikeComment,
}: props) => {
  const location = useLocation();

  return (
    <StyledCardComment>
      {comments.length > 2 && (
        <Link
          to={{
            pathname: `/post-detail/${post.id}`,
            state: { postDetail: location, mode: 'home' },
          }}
        >
          <button>댓글 {comments.length}개 모두 보기</button>
        </Link>
      )}
      {comments.length > 1 && (
        <div className="comment">
          <div>
            <span className="nickname">
              {comments[comments.length - 2].user.nickname}{' '}
            </span>
            <span>
              {filterHashAndAt(comments[comments.length - 2].content)}
            </span>
          </div>

          {comments[comments.length - 2].likedUser.find(
            (v) => v.userId === userId
          ) ? (
            <button
              className="heart-button fill"
              onClick={() =>
                onClickUnlikeComment(comments[comments.length - 2].id)
              }
            >
              <BsHeartFill />
            </button>
          ) : (
            <button
              className="heart-button"
              onClick={() =>
                onClickLikeComment(comments[comments.length - 2].id)
              }
            >
              <BsHeart />
            </button>
          )}
        </div>
      )}
      {comments.length > 0 && (
        <div className="comment">
          <div>
            <span className="nickname">
              {comments[comments.length - 1].user.nickname}{' '}
            </span>
            <span>
              {filterHashAndAt(comments[comments.length - 1].content)}
            </span>
          </div>

          {comments[comments.length - 1].likedUser.find(
            (v) => v.userId === userId
          ) ? (
            <button
              className="heart-button fill"
              onClick={() =>
                onClickUnlikeComment(comments[comments.length - 1].id)
              }
            >
              <BsHeartFill />
            </button>
          ) : (
            <button
              className="heart-button"
              onClick={() =>
                onClickLikeComment(comments[comments.length - 1].id)
              }
            >
              <BsHeart />
            </button>
          )}
        </div>
      )}
    </StyledCardComment>
  );
};

export default CardComment;
