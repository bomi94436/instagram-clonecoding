import React, { useState } from 'react';
import { filterHashAndAt } from '../../lib/util';
import { StyledCardContent } from './styles';

interface props {
  nickname: string;
  content: string;
}

const CardContent = ({ nickname, content }: props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <StyledCardContent isOpened={isOpened}>
      <span>{nickname} </span>
      {content.split('\n').length > 1 && !isOpened ? (
        <span>
          {filterHashAndAt(content.split('\n')[0])}...
          <button onClick={() => setIsOpened((prev) => !prev)}> 더 보기</button>
        </span>
      ) : (
        <span>{filterHashAndAt(content)}</span>
      )}
    </StyledCardContent>
  );
};

export default CardContent;
