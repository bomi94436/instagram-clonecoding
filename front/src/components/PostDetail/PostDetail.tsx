import React, { useCallback, useRef, useState } from 'react';
import { StyledMorePostModal, StyledSlider } from '../Home/styles';
import { filterHashAndAt, sliderSettings, timeForToday } from '../../lib/util';
import { Comment, Picture, Post } from '../../store/post/types';
import Video from '../Home/Video';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import {
  BsBookmark,
  BsHeart,
  BsHeartFill,
  FiMoreHorizontal,
  IoChatbubbleOutline,
} from 'react-icons/all';
import Modal from '../common/Modal';
import useInput from '../../lib/hooks/useInput';
import CardCommentForm from '../Home/CardCommentForm';
import { StyledPostDetailModal } from './styles';
import { EmojiPicker } from '../index';
import PostDetailCommentContainer from '../../containers/PostDetail/PostDetailCommentContainer';
import CopyToClipboard from 'react-copy-to-clipboard';
import config from '../../config';

interface props {
  userId: number | null;
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
  handleClickOutside: (e: any) => void;
  modalRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLElement>;
  likedPost: { postId: number }[];
  onClickLike: (postId: number) => void;
  onClickUnlike: (postId: number) => void;
  onClickDeletePost: (postId: number) => void;
  onSubmitComment: (
    e: React.FormEvent<HTMLFormElement>
  ) => (postId: number, content: string, replyId?: number | undefined) => void;
}

const PostDetail = ({
  userId,
  post,
  prevPost,
  nextPost,
  handleClickOutside,
  modalRef,
  contentRef,
  likedPost,
  onClickLike,
  onClickUnlike,
  onClickDeletePost,
  onSubmitComment,
}: props) => {
  const [current, setCurrent] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [replyId, setReplyId] = useState<number | undefined>(undefined);
  const [comment, onChangeComment, setComment] = useInput('');
  const commentRef = useRef<HTMLInputElement>(null);

  const onClickReply = useCallback(
    (replyId: number | undefined, nickname: string) => {
      setReplyId(replyId);
      setComment(`@${nickname} `);
      commentRef.current?.focus();
    },
    [setReplyId, setComment]
  );

  return (
    <StyledPostDetailModal onClick={handleClickOutside}>
      <article ref={modalRef}>
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
          <header>
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
          </header>

          <section className="middle" ref={contentRef}>
            <div className="content">
              {post.user?.profile ? (
                <img
                  src={`http://localhost:3065/${post.user.profile}`}
                  alt={post.user.profile}
                />
              ) : (
                <img src={defaultProfile} alt="default profile" />
              )}

              <div className="content-middle">
                <div>
                  <span className="nickname">{post.user.nickname} </span>
                  <span>{filterHashAndAt(post.content)}</span>
                </div>
                <div>
                  <span className="time-and-liked-user">
                    {timeForToday(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {post.comments.map(
              (comment: Comment) =>
                comment.replyId === null && (
                  <PostDetailCommentContainer
                    key={comment.id}
                    postId={post.id}
                    comment={comment}
                    onClickReply={onClickReply}
                  />
                )
            )}
          </section>

          <section className="bottom">
            <div className="icons">
              <div>
                {likedPost.find((v) => v.postId === post.id) ? (
                  <button
                    className="fill-heart"
                    onClick={() => {
                      onClickUnlike(post.id);
                    }}
                  >
                    <BsHeartFill />
                  </button>
                ) : (
                  <button onClick={() => onClickLike(post.id)}>
                    <BsHeart />
                  </button>
                )}

                <button onClick={() => commentRef.current?.focus()}>
                  <IoChatbubbleOutline />
                </button>
              </div>

              <button>
                <BsBookmark />
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

            <div className="time-and-liked-user">
              {timeForToday(post.createdAt)}
            </div>
          </section>

          <CardCommentForm
            postId={post.id}
            comment={comment}
            setComment={setComment}
            onChangeComment={onChangeComment}
            onSubmitComment={onSubmitComment}
            setOpenEmojiPicker={setOpenEmojiPicker}
            commentRef={commentRef}
            replyId={replyId}
            setReplyId={setReplyId}
          />
        </div>

        {openEmojiPicker && (
          <EmojiPicker
            component="postDetail"
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
                  onClick={() => onClickDeletePost(post.id)}
                >
                  ??????
                </button>
              )}

              <CopyToClipboard
                text={`${config.frontUrl}/post-detail/${post.id}`}
              >
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
      </article>
    </StyledPostDetailModal>
  );
};

export default PostDetail;
