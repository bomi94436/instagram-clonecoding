import React from 'react';
import { VscSmiley } from 'react-icons/all';
import { StyledCardCommentForm } from './styles';

interface props {
  postId: number;
  comment: string;
  setComment: React.Dispatch<string>;
  onChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitComment: (
    e: React.FormEvent<HTMLFormElement>
  ) => (postId: number, content: string, replyId?: number | undefined) => void;
  setOpenEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  commentRef: React.RefObject<HTMLInputElement>;
}

const CardCommentForm = ({
  postId,
  comment,
  setComment,
  onChangeComment,
  onSubmitComment,
  setOpenEmojiPicker,
  commentRef,
}: props) => {
  return (
    <StyledCardCommentForm
      onSubmit={(e) => {
        onSubmitComment(e)(postId, comment);
        setOpenEmojiPicker(false);
        setComment('');
        commentRef.current?.blur();
      }}
    >
      <div className="left">
        <button
          type="button"
          className="emoji"
          onClick={() => setOpenEmojiPicker((prev) => !prev)}
        >
          <VscSmiley className="icon" />
        </button>

        <input
          type="text"
          value={comment}
          onChange={onChangeComment}
          onClick={() => setOpenEmojiPicker(false)}
          ref={commentRef}
          placeholder="댓글 달기..."
        />
      </div>

      <button
        type="submit"
        className={`submit${!comment ? ' disabled' : ''}`}
        disabled={!comment}
      >
        게시
      </button>
    </StyledCardCommentForm>
  );
};

export default CardCommentForm;
