import React from 'react';
import AppLayout from '../common/AppLayout';
import { StyledSection, Wrapper } from './styles';
import { Post } from '../../store/post/types';
import { FaPlay, IoCopy } from 'react-icons/all';

interface props {
  posts: Post[];
}

const Explore = ({ posts }: props) => {
  return (
    <AppLayout>
      <Wrapper>
        <StyledSection>
          {posts?.map((v: Post) => (
            <button>
              {v.pictures[0].type === 'image' ? (
                <img
                  src={`http://localhost:3065/${v.pictures[0].src}`}
                  alt={v.pictures[0].src}
                />
              ) : (
                <video src={`http://localhost:3065/${v.pictures[0].src}#t=0`} />
              )}
              <div className="icon">
                {v.pictures.length === 1 ? (
                  v.pictures[0].type === 'video' && <FaPlay />
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
