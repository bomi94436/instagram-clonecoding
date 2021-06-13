import React, { useEffect } from 'react';
import AppLayout from '../common/AppLayout';
import { Wrapper } from './styles';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import { Post } from '../../store/post/types';
import CardContainer from '../../containers/Home/CardContainer';

interface props {
  profile: string | undefined;
  nickname: string | null;
  posts: Post[];
}

const Home = ({ profile, nickname, posts }: props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppLayout>
      <Wrapper>
        <div className="left">
          {posts?.map((post: Post) => (
            <CardContainer key={post.id} post={post} />
          ))}
        </div>

        <div className="right">
          <div className="info">
            <div className="profile">
              {profile ? (
                <img src={`http://localhost:3065/${profile}`} alt={profile} />
              ) : (
                <img src={defaultProfile} alt="default profile" />
              )}
              <span>{nickname}</span>
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
