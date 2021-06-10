import React from 'react';
import { StyledLink } from './styles';

interface props {
  content: string;
}

const CardContent = ({ content }: props) => (
  <span>
    {content.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <StyledLink to={`/explore/tags/${v.slice(1)}`} key={v}>
            {v}
          </StyledLink>
        );
      }
      return v;
    })}
  </span>
);

export default CardContent;
