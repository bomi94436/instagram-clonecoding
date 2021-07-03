import React, { useCallback, useEffect, useRef } from 'react';
import Picker from 'emoji-picker-react';
import { StyledEmojiPicker } from './styles';

interface props {
  component: 'home' | 'postDetail';
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setOpenEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmojiPicker = ({
  component,
  comment,
  setComment,
  setOpenEmojiPicker,
}: props) => {
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideEmoji = useCallback(
    ({ target }) => {
      if (!emojiRef.current?.contains(target)) setOpenEmojiPicker(false);
    },
    [setOpenEmojiPicker]
  );

  useEffect(() => {
    window.addEventListener('click', handleClickOutsideEmoji);
    return () => {
      window.removeEventListener('click', handleClickOutsideEmoji);
    };
  }, [handleClickOutsideEmoji]);

  return (
    <StyledEmojiPicker
      className={`${component === 'home' ? 'home' : 'post-detail'}`}
      ref={emojiRef}
    >
      <Picker
        onEmojiClick={(event, data) => setComment(comment + data.emoji)}
      />
    </StyledEmojiPicker>
  );
};

export default EmojiPicker;
