import React, { useState } from 'react';
import { filterHashAndAt, timeForToday } from '../../lib/util';
import { BsHeart } from 'react-icons/all';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import { Comment } from '../../store/post/types';

interface props {
  comment: Comment;
  onClickReply: (replyId: number | undefined, nickname: string) => void;
}

const PostDetailComment = ({ comment, onClickReply }: props) => {
  const [openReply, setOpenReply] = useState(false);

  return (
    <div key={comment.id}>
      <div key={comment.id} className="comment">
        <div>
          {comment.user?.profile ? (
            <img
              src={`http://localhost:3065/${comment.user.profile}`}
              alt={comment.user.profile}
            />
          ) : (
            <img src={defaultProfile} alt="default profile" />
          )}

          <div className="comment-middle">
            <div>
              <span className="nickname">{comment.user.nickname} </span>
              <span>{filterHashAndAt(comment.content)}</span>
            </div>
            <div>
              <span className="time">{timeForToday(comment.createdAt)}</span>
              <span
                className="reply-button"
                onClick={() => onClickReply(comment.id, comment.user.nickname)}
              >
                답글 달기
              </span>
            </div>
          </div>
        </div>

        <button>
          <BsHeart />
        </button>
      </div>

      {comment.replies?.length > 0 && (
        <div className="reply-cover">
          <div>
            <div />
            <span
              className="reply-button"
              onClick={() => setOpenReply((prev) => !prev)}
            >
              {!openReply
                ? `답글 보기(${comment.replies.length})`
                : `답글 숨기기`}
            </span>
          </div>

          {openReply &&
            comment.replies.map((reply: Comment) => (
              <div key={reply.id} className="comment">
                <div>
                  {comment.user?.profile ? (
                    <img
                      src={`http://localhost:3065/${reply.user.profile}`}
                      alt={reply.user.profile}
                    />
                  ) : (
                    <img src={defaultProfile} alt="default profile" />
                  )}

                  <div className="comment-middle">
                    <div>
                      <span className="nickname">{reply.user.nickname} </span>
                      <span>{filterHashAndAt(reply.content)}</span>
                    </div>
                    <div>
                      <span className="time">
                        {timeForToday(reply.createdAt)}
                      </span>
                      <span
                        className="reply-button"
                        onClick={() =>
                          onClickReply(reply.replyId, reply.user.nickname)
                        }
                      >
                        답글 달기
                      </span>
                    </div>
                  </div>
                </div>

                <button>
                  <BsHeart />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PostDetailComment;
