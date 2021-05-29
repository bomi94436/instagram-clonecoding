import React from 'react';
import { StyledNavBar } from './styles';

interface props {
  user: string | null;
  onClickLogout: () => void;
}

const NavBar = ({ user, onClickLogout }: props) => {
  return (
    <StyledNavBar>
      <div className="content">
        <div>instagram</div>
        <div>검색</div>
        <div>
          <span>{user}</span>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
      </div>
    </StyledNavBar>
  );
};

export default NavBar;
