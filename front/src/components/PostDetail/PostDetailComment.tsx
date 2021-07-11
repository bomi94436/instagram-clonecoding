import React, { useState } from 'react';
import { filterHashAndAt, timeForToday } from '../../lib/util';
import { BsHeart, BsHeartFill, FiMoreHorizontal } from 'react-icons/all';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import { Comment } from '../../store/post/types';
import Modal from '../common/Modal';
import { StyledMorePostModal } from '../Home/styles';

interface props {
  userId: number | null;
  postId: number;
  comment: Comment;
  onClickReply: (replyId: number | undefined, nickname: string) => void;
  onClickDeleteComment: (postId: number, commentId: number) => void;
  onClickLikeComment: (commentId: number) => void;
  onClickUnlikeComment: (commentId: number) => void;
}

const PostDetailComment = ({
  userId,
  postId,
  comment,
  onClickReply,
  onClickDeleteComment,
  onClickLikeComment,
  onClickUnlikeComment,
}: props) => {
  const [openReply, setOpenReply] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);

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
              <span className="time-and-liked-user">
                {timeForToday(comment.createdAt)}
              </span>

              {comment.likedUser.length > 0 && (
                <span className="time-and-liked-user">
                  좋아요 {comment.likedUser.length}개
                </span>
              )}

              <span
                className="reply-button"
                onClick={() => onClickReply(comment.id, comment.user.nickname)}
              >
                답글 달기
              </span>
            </div>
          </div>
        </div>

        {userId === comment.user.id && (
          <button className="more-button" onClick={() => setOpenModal(true)}>
            <FiMoreHorizontal />
          </button>
        )}

        {comment.likedUser.find((v) => v.userId === userId) ? (
          <button
            className="heart-button fill"
            onClick={() => onClickUnlikeComment(comment.id)}
          >
            <BsHeartFill />
          </button>
        ) : (
          <button
            className="heart-button"
            onClick={() => onClickLikeComment(comment.id)}
          >
            <BsHeart />
          </button>
        )}
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
                      <span className="time-and-liked-user">
                        {timeForToday(reply.createdAt)}
                      </span>

                      {reply.likedUser.length > 0 && (
                        <span className="time-and-liked-user">
                          좋아요 {reply.likedUser.length}개
                        </span>
                      )}

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

                {userId === comment.user.id && (
                  <button
                    className="more-button"
                    onClick={() => setOpenReplyModal(true)}
                  >
                    <FiMoreHorizontal />
                  </button>
                )}

                {reply.likedUser.find((v) => v.userId === userId) ? (
                  <button
                    className="heart-button fill"
                    onClick={() => onClickUnlikeComment(reply.id)}
                  >
                    <BsHeartFill />
                  </button>
                ) : (
                  <button
                    className="heart-button"
                    onClick={() => onClickLikeComment(reply.id)}
                  >
                    <BsHeart />
                  </button>
                )}

                {openReplyModal && (
                  <Modal
                    openModal={openReplyModal}
                    setOpenModal={setOpenReplyModal}
                  >
                    <StyledMorePostModal>
                      <button
                        className="delete"
                        onClick={() => {
                          onClickDeleteComment(postId, reply.id);
                          setOpenReplyModal(false);
                          setOpenReply(false);
                        }}
                      >
                        삭제
                      </button>
                      <button onClick={() => setOpenReplyModal(false)}>
                        취소
                      </button>
                    </StyledMorePostModal>
                  </Modal>
                )}
              </div>
            ))}
        </div>
      )}

      {openModal && (
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <StyledMorePostModal>
            <button
              className="delete"
              onClick={() => onClickDeleteComment(postId, comment.id)}
            >
              삭제
            </button>
            <button onClick={() => setOpenModal(false)}>취소</button>
          </StyledMorePostModal>
        </Modal>
      )}
    </div>
  );
};

export default PostDetailComment;
