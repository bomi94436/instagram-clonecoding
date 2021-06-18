import React from 'react';
import AppLayout from '../common/AppLayout';
import { StyledSection, Wrapper } from './styles';
import { Post } from '../../store/post/types';
import { FaPlay, IoCopy } from 'react-icons/all';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface props {
  posts: Post[];
}

const Explore = ({ location, posts }: props & RouteComponentProps) => {
  return (
    <AppLayout>
      <Wrapper>
        <StyledSection>
          {posts?.map((post: Post) => (
            <button key={post.id}>
              <Link
                to={{
                  pathname: `/post-detail/${post.id}`,
                  state: { postDetail: location, mode: 'explore', post },
                }}
              >
                <div className="cover">
                  {post.likeCount}
                  {post.comments.length}
                </div>
                <div className="contents">
                  {post.pictures[0].type === 'image' ? (
                    <img
                      src={`http://localhost:3065/${post.pictures[0].src}`}
                      alt={post.pictures[0].src}
                    />
                  ) : (
                    <video
                      disablePictureInPicture
                      preload="metadata"
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
                </div>
              </Link>
            </button>
          ))}
        </StyledSection>
      </Wrapper>
    </AppLayout>
  );
};
export default withRouter(Explore);
