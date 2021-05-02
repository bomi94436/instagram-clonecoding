import React, { useState } from 'react';
import faker from 'faker';
import AppLayout from '../common/AppLayout';
import { Card, Wrapper } from './styles';
import {
  BsBookmark,
  BsHeart,
  FiMoreHorizontal,
  IoChatbubbleOutline,
  VscSmiley,
} from 'react-icons/all';
import Picker, { IEmojiData } from 'emoji-picker-react';
import useInput from '../../lib/hooks/useInput';

const Home = () => {
  // TODO: emoji 관련들 container로 옮길 것
  const [chosenEmoji, setChosenEmoji] = useState<null | IEmojiData>(null);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [comment, onChangeComment] = useInput('');

  const onEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <AppLayout>
      <Wrapper>
        <div className="left">
          <Card>
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
                  placeholder="댓글 달기..."
                />
              </div>

              <button
                className={`submit${!comment ? ' disabled' : ''}`}
                disabled={!comment}
                onClick={() => console.log('hi')}
              >
                게시
              </button>
            </div>
          </Card>

          {openEmojiPicker && (
            <div className="emoji-picker">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className="right">
          <div className="info">
            <div className="profile">
              <img src={faker.image.avatar()} alt={faker.image.avatar()} />
              <span>{faker.name.findName()}</span>
            </div>

            <div className="follow">
              <button>
                게시물 <span className="num">0</span>
              </button>
              <button>
                팔로워 <span className="num">0</span>
              </button>
              <button>
                팔로우 <span className="num">0</span>
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </AppLayout>
  );
};
export default Home;
