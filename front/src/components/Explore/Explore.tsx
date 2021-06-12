import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import { StyledSection, Wrapper } from './styles';
import { Post } from '../../store/post/types';
import { FaPlay, IoCopy } from 'react-icons/all';

interface props {
  posts: Post[];
}

const Explore = ({ posts }: props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppLayout>
      <Wrapper>
        <StyledSection>
          {posts?.map((post: Post) => (
            <button key={post.id}>
              {post.pictures[0].type === 'image' ? (
                <img
                  src={`http://localhost:3065/${post.pictures[0].src}`}
                  alt={post.pictures[0].src}
                />
              ) : (
                <video
                  src={`http://localhost:3065/${post.pictures[0].src}#t=0`}
                />
              )}
              <div className="icon">
                {post.pictures.length === 1 ? (
                  post.pictures[0].type === 'video' && <FaPlay />
                ) : (
                  <IoCopy />
                )}
              </div>
            </button>
          ))}
        </StyledSection>
      </Wrapper>
    </AppLayout>
  );
};
export default Explore;
