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
import { StyledCard, StyledCardWrapper } from './styles';

const Card = () => {
  const [comment, onChangeComment, setComment] = useInput('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  return (
    <StyledCardWrapper>
      <StyledCard>
        <div className="top">
          <div>
            <img src={faker.image.avatar()} alt={faker.image.avatar()} />
            <span>{faker.name.findName()}</span>
          </div>

          <button>
            <FiMoreHorizontal />
          </button>
        </div>

        <img src={faker.image.image()} alt={faker.image.image()} />

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
            <span>{faker.name.findName()} </span>
            내용내용내용
          </div>

          <div className="time">7시간 전</div>
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
