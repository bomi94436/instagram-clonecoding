import React from 'react';
import { filterHashAndAt } from '../../lib/util';
import { StyledCardComment } from './styles';
import { BsHeart } from 'react-icons/all';
import { Link, useLocation } from 'react-router-dom';
import { Comment, Post } from '../../store/post/types';

interface props {
  post: Post;
  comments: Comment[];
}

const CardComment = ({ post, comments }: props) => {
  const location = useLocation();
  const sortComments: Comment[] = [];

  if (comments.length > 1) {
    sortComments.push(comments[comments.length - 2]);
    if (comments[comments.length - 2].replies?.length > 0) {
      comments[comments.length - 2].replies.forEach((reply) =>
        sortComments.push(reply)
      );
    }
  }
  if (comments.length > 0) {
    sortComments.push(comments[comments.length - 1]);
    if (comments[comments.length - 1].replies?.length > 0) {
      comments[comments.length - 1].replies.forEach((reply) =>
        sortComments.push(reply)
      );
    }
  }

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
      {sortComments.length > 1 && (
        <div className="comment">
          <div>
            <span className="nickname">
              {sortComments[sortComments.length - 2].user.nickname}{' '}
            </span>
            <span>
              {filterHashAndAt(sortComments[sortComments.length - 2].content)}
            </span>
          </div>
          <button>
            <BsHeart />
          </button>
        </div>
      )}
      {sortComments.length > 0 && (
        <div className="comment">
          <div>
            <span className="nickname">
              {sortComments[sortComments.length - 1].user.nickname}{' '}
            </span>
            <span>
              {filterHashAndAt(sortComments[sortComments.length - 1].content)}
            </span>
          </div>
          <button>
            <BsHeart />
          </button>
        </div>
      )}
    </StyledCardComment>
  );
};

export default CardComment;
