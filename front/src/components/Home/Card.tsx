import React, { useRef, useState } from 'react';
import {
  BsBookmark,
  BsHeart,
  BsHeartFill,
  FiMoreHorizontal,
  IoChatbubbleOutline,
} from 'react-icons/all';
import useInput from '../../lib/hooks/useInput';
import {
  StyledCard,
  StyledCardWrapper,
  StyledMorePostModal,
  StyledSlider,
} from './styles';
import CardContent from './CardContent';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import Video from './Video';
import { Picture, Post } from '../../store/post/types';
import { sliderSettings, timeForToday } from '../../lib/util';
import Modal from '../common/Modal';
import CardComment from './CardComment';
import CardCommentForm from './CardCommentForm';
import { EmojiPicker } from '../index';
import CopyToClipboard from 'react-copy-to-clipboard';
import config from '../../config';

interface props {
  userId: number | null;
  post: Post;
  likedPost: { postId: number }[];
  onClickLike: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => (postId: number) => void;
  onClickUnlike: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => (postId: number) => void;
  onClickLikeComment: (commentId: number) => void;
  onClickUnlikeComment: (commentId: number) => void;
  onClickDeletePost: (postId: number) => void;
  onSubmitComment: (
    e: React.FormEvent<HTMLFormElement>
  ) => (postId: number, content: string, replyId?: number | undefined) => void;
}

const Card = ({
  userId,
  post,
  likedPost,
  onClickLike,
  onClickUnlike,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickDeletePost,
  onSubmitComment,
}: props) => {
  const [comment, onChangeComment, setComment] = useInput('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fadeHeart, setFadeHeart] = useState<boolean>(false);
  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <StyledCardWrapper>
      <StyledCard>
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

            <span>{post.user.nickname}</span>
          </div>

          <button onClick={() => setOpenModal(true)}>
            <FiMoreHorizontal />
          </button>
        </div>

        <StyledSlider {...sliderSettings(setCurrent)} isModal={false}>
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

        <div className="content">
          <div className="icons">
            <div className="left">
              {likedPost.find((v) => v.postId === post.id) ? (
                <button
                  className={`fill-heart${fadeHeart ? ' fade' : ''}`}
                  onClick={(e) => {
                    onClickUnlike(e)(post.id);
                    setFadeHeart(true);
                  }}
                  onAnimationEnd={() => setFadeHeart(false)}
                >
                  <BsHeartFill />
                </button>
              ) : (
                <button
                  className={`${fadeHeart ? ' fade' : ''}`}
                  onClick={(e) => {
                    onClickLike(e)(post.id);
                    setFadeHeart(true);
                  }}
                  onAnimationEnd={() => setFadeHeart(false)}
                >
                  <BsHeart />
                </button>
              )}
              <button onClick={() => commentRef.current?.focus()}>
                <IoChatbubbleOutline />
              </button>
            </div>
            <button>
              <BsBookmark />
              {/* BsBookmarkFill */}
            </button>
          </div>

          {post.likeCount > 0 ? (
            <div className="liked">
              ????????? <span>{post.likeCount}</span>???
            </div>
          ) : (
            <div className="liked">
              ?????? ?????? <span>?????????</span>??? ???????????????
            </div>
          )}

          <CardContent nickname={post.user.nickname} content={post.content} />

          <CardComment
            userId={userId}
            post={post}
            comments={post.comments}
            onClickLikeComment={onClickLikeComment}
            onClickUnlikeComment={onClickUnlikeComment}
          />

          <div className="time">{timeForToday(post.createdAt)}</div>
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
      </StyledCard>

      {openEmojiPicker && (
        <EmojiPicker
          component="home"
          comment={comment}
          setComment={setComment}
          setOpenEmojiPicker={setOpenEmojiPicker}
        />
      )}

      {openModal && (
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <StyledMorePostModal>
            {post.user.id === userId && (
              <button
                className="delete"
                onClick={() => {
                  onClickDeletePost(post.id);
                  setOpenModal(false);
                }}
              >
                ??????
              </button>
            )}

            <CopyToClipboard text={`${config.frontUrl}/post-detail/${post.id}`}>
              <button
                onClick={() => {
                  alert('????????? ?????????????????????.');
                  setOpenModal(false);
                }}
              >
                ?????? ??????
              </button>
            </CopyToClipboard>

            <button onClick={() => setOpenModal(false)}>??????</button>
          </StyledMorePostModal>
        </Modal>
      )}
    </StyledCardWrapper>
  );
};

export default Card;
