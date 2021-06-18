import React from 'react';
import { filterHashAndAt } from '../../lib/util';
import { StyledCardComment } from './styles';
import { BsHeart } from 'react-icons/all';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Post } from '../../store/post/types';

interface props {
  post: Post;
  comments: {
    id: number;
    content: string;
    replyId?: number;
    user: {
      id: number;
      nickname: string;
      profile?: string;
    };
  }[];
}

const CardComment = ({ post, comments }: props & RouteComponentProps) => {
  const location = useLocation();

  return (
    <StyledCardComment>
      {comments.length > 2 && (
        <Link
          to={{
            pathname: `/post-detail/${post.id}`,
            state: { postDetail: location, mode: 'home', post },
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
          <BsHeart />
        </div>
      )}
      {(comments.length === 1 || comments.length > 1) && (
        <div className="comment">
          <div>
            <span className="nickname">
              {comments[comments.length - 1].user.nickname}{' '}
            </span>
            <span>
              {filterHashAndAt(comments[comments.length - 1].content)}
            </span>
          </div>
          <BsHeart />
        </div>
      )}
    </StyledCardComment>
  );
};

export default withRouter(CardComment);
