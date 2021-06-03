import React from 'react';
import faker from 'faker';
import AppLayout from '../common/AppLayout';
import { Wrapper } from './styles';
import Card from './Card';
import { UserInfo } from '../../store/auth/types';

interface props {
  user: UserInfo;
}

const Home = ({ user }: props) => {
  return (
    <AppLayout>
      <Wrapper>
        <div className="left">
          <Card />
          <Card />
          <Card />
        </div>

        <div className="right">
          <div className="info">
            <div className="profile">
              <img src={faker.image.avatar()} alt={faker.image.avatar()} />
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
