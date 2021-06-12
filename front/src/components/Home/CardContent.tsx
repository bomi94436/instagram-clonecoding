import React, { useState } from 'react';
import { StyledCardContent, StyledLink } from './styles';

interface props {
  nickname: string;
  content: string;
}

const filterHashtag = (content: string) =>
  content.split(/(#[^\s#]+)/g).map((v) => {
    if (v.match(/(#[^\s#]+)/)) {
      return (
        <StyledLink to={`/explore/tags/${v.slice(1)}`} key={v}>
          {v}
        </StyledLink>
      );
    }
    return v;
  });

const CardContent = ({ nickname, content }: props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <StyledCardContent isOpened={isOpened}>
      <span>{nickname} </span>
      {content.split('\n').length > 1 && !isOpened ? (
        <span>
          {filterHashtag(content.split('\n')[0])}...
          <button onClick={() => setIsOpened((prev) => (prev = !prev))}>
            {' '}
            더 보기
          </button>
        </span>
      ) : (
        <span>{filterHashtag(content)}</span>
      )}
    </StyledCardContent>
  );
};

export default CardContent;
