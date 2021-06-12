import React, { useState } from 'react';
import faker from 'faker';
import {
  BsBookmark,
  BsHeart,
  FiMoreHorizontal,
  IoChatbubbleOutline,
  VscSmiley,
} from 'react-icons/all';
import Picker from 'emoji-picker-react';
import useInput from '../../lib/hooks/useInput';
import { StyledCard, StyledCardWrapper, StyledSlider } from './styles';
import CardContent from './CardContent';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import Video from './Video';
import { Picture, Post } from '../../store/post/types';
import { timeForToday } from '../../lib/util';

interface props {
  post: Post;
}

const Card = ({ post }: props) => {
  const [comment, onChangeComment, setComment] = useInput('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'view',
    appendDots: (dots: JSX.Element) => (
      <div>
        <ul style={{ margin: '5px', padding: '0' }}>{dots}</ul>
      </div>
    ),
    afterChange: (current: number) => setCurrent(current),
  };

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

          <button>
            <FiMoreHorizontal />
          </button>
        </div>

        <StyledSlider {...sliderSettings}>
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
              <button>
                <BsHeart />
                {/* BsHeartFill */}
              </button>
              <button>
                <IoChatbubbleOutline />
              </button>
            </div>
            <button>
              <BsBookmark />
              {/* BsBookmarkFill */}
            </button>
          </div>

          <div className="liked">
            <span>{faker.name.findName()}</span>님 외 여러명이 좋아합니다
          </div>

          <div className="text">
            <span>{post.user.nickname} </span>

            {post.content.split('\\n').map((line, index) => (
              <span key={index}>
                <CardContent content={line} />
                <br />
              </span>
            ))}
          </div>

          <div className="time">{timeForToday(post.createdAt)}</div>
        </div>

        <div className="comment">
          <div className="left">
            <button
              className="emoji"
              onClick={() => setOpenEmojiPicker((prev) => (prev = !prev))}
            >
              <VscSmiley className="icon" />
            </button>

            <input
              value={comment}
              onChange={onChangeComment}
              onClick={() => setOpenEmojiPicker(false)}
              placeholder="댓글 달기..."
            />
          </div>

          <button
            className={`submit${!comment ? ' disabled' : ''}`}
            disabled={!comment}
            onClick={() => {
              setOpenEmojiPicker(false);
            }}
          >
            게시
          </button>
        </div>
      </StyledCard>

      {openEmojiPicker && (
        <div className="emoji-picker">
          <Picker
            onEmojiClick={(event, data) => setComment(comment + data.emoji)}
          />
        </div>
      )}
    </StyledCardWrapper>
  );
};

export default Card;
