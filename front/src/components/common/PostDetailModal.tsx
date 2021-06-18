import React, { useRef, useState } from 'react';
import { StyledMorePostModal, StyledSlider } from '../Home/styles';
import { filterHashAndAt, sliderSettings, timeForToday } from '../../lib/util';
import { Picture, Post } from '../../store/post/types';
import Video from '../Home/Video';
import { StyledPostDetailModal } from './styles';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import { FiMoreHorizontal } from 'react-icons/all';
import Picker from 'emoji-picker-react';
import Modal from './Modal';
import useInput from '../../lib/hooks/useInput';
import CardCommentForm from '../Home/CardCommentForm';

interface props {
  userId: number | null;
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
  handleClickOutside: (e: any) => void;
  modalRef: React.RefObject<HTMLDivElement>;
  onSubmitComment: (
    e: React.FormEvent<HTMLFormElement>
  ) => (postId: number, content: string, replyId?: number | undefined) => void;
}

const PostDetailModal = ({
  userId,
  post,
  handleClickOutside,
  modalRef,
  onSubmitComment,
}: props) => {
  const [current, setCurrent] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [comment, onChangeComment, setComment] = useInput('');
  const emojiRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <StyledPostDetailModal onClick={handleClickOutside}>
      <div ref={modalRef}>
        <div className="modal-left">
          <StyledSlider {...sliderSettings(setCurrent)} isModal={true}>
            {post.pictures.map((picture: Picture) =>
              picture.type === 'image' ? (
                <img
                  key={picture.id}
                  src={`http://localhost:3065/${picture.src}`}
                  alt={picture.src}
                />
              ) : (
                <Video key={picture.id} picture={picture} current={current} />
              )
            )}
          </StyledSlider>
        </div>

        <div className="modal-right">
          <div className="top">
            <div>
              {post.user?.profile ? (
                <img
                  src={`http://localhost:3065/${post.user.profile}`}
                  alt={post.user.profile}
                />
              ) : (
                <img src={defaultProfile} alt="default profile" />
              )}

              <span className="nickname">{post.user.nickname}</span>
            </div>

            <button onClick={() => setOpenModal(true)}>
              <FiMoreHorizontal />
            </button>
          </div>

          <div className="middle">
            <div className="content">
              {post.user?.profile ? (
                <img
                  src={`http://localhost:3065/${post.user.profile}`}
                  alt={post.user.profile}
                />
              ) : (
                <img src={defaultProfile} alt="default profile" />
              )}

              <div>
                <>
                  <span className="nickname">{post.user.nickname} </span>
                  <span>{filterHashAndAt(post.content)}</span>
                </>
                <span className="time">{timeForToday(post.createdAt)}</span>
              </div>
            </div>
          </div>

          <CardCommentForm
            postId={post.id}
            comment={comment}
            setComment={setComment}
            onChangeComment={onChangeComment}
            onSubmitComment={onSubmitComment}
            setOpenEmojiPicker={setOpenEmojiPicker}
            commentRef={commentRef}
          />
        </div>
      </div>

      {openEmojiPicker && (
        <div className="emoji-picker" ref={emojiRef}>
          <Picker
            onEmojiClick={(event, data) => setComment(comment + data.emoji)}
          />
        </div>
      )}

      {openModal && (
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <StyledMorePostModal>
            {post.user.id === userId && (
              <button className="delete">삭제</button>
            )}
            <button>링크 복사</button>
            <button onClick={() => setOpenModal(false)}>취소</button>
          </StyledMorePostModal>
        </Modal>
      )}
    </StyledPostDetailModal>
  );
};

export default PostDetailModal;
