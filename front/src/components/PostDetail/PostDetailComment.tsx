import React, { useState } from 'react';
import { filterHashAndAt, timeForToday } from '../../lib/util';
import { BsHeart, FiMoreHorizontal } from 'react-icons/all';
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
}

const PostDetailComment = ({
  userId,
  postId,
  comment,
  onClickReply,
  onClickDeleteComment,
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

        {userId === comment.user.id && (
          <button className="more-button" onClick={() => setOpenModal(true)}>
            <FiMoreHorizontal />
          </button>
        )}

        <button className="heart-button">
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

                {userId === comment.user.id && (
                  <button
                    className="more-button"
                    onClick={() => setOpenReplyModal(true)}
                  >
                    <FiMoreHorizontal />
                  </button>
                )}

                <button className="heart-button">
                  <BsHeart />
                </button>

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
