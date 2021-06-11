import React from 'react';
import AppLayout from '../common/AppLayout';
import { Wrapper } from './styles';
import Card from './Card';
import { UserInfo } from '../../store/auth/types';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import { Post } from '../../store/post/types';

interface props {
  user: UserInfo;
  posts: Post[];
}

const Home = ({ user, posts }: props) => {
  return (
    <AppLayout>
      <Wrapper>
        <div className="left">
          {posts?.map((post: Post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>

        <div className="right">
          <div className="info">
            <div className="profile">
              {user?.profile ? (
                <img
                  src={`http://localhost:3065/${user.profile}`}
                  alt={user.profile}
                />
              ) : (
                <img src={defaultProfile} alt="default profile" />
              )}
              <span>{user.nickname}</span>
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
