import React from 'react';
import AppLayout from '../common/AppLayout';
import { StyledSection, Wrapper } from './styles';
import { Post } from '../../store/post/types';
import Item from './Item';

interface props {
  posts: Post[];
}

const Explore = ({ posts }: props) => {
  return (
    <AppLayout>
      <Wrapper>
        <StyledSection>
          {posts?.map((post: Post) => (
            <Item key={post.id} post={post} />
          ))}
        </StyledSection>
      </Wrapper>
    </AppLayout>
  );
};
export default Explore;
