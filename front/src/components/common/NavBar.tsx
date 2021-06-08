import React, { useState } from 'react';
import { StyledNavBar, StyledMenu } from './styles';
import { BsGearWide, CgProfile, BsPlusSquare } from 'react-icons/all';
import { Link } from 'react-router-dom';
import logo from '../../lib/assets/InstagramLogo.png';
import defaultProfile from '../../lib/assets/default_profile.jpg';
import { UserInfo } from '../../store/auth/types';

interface props {
  user: UserInfo;
  onClickLogout: () => void;
}

const NavBar = ({ user, onClickLogout }: props) => {
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);

  return (
    <StyledNavBar>
      <div className="content">
        <button className="home-button">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </button>

        <div>검색</div>

        <div className="icons">
          <button className="upload-button">
            <Link to="/upload">
              <BsPlusSquare />
            </Link>
          </button>

          <StyledMenu>
            {user?.profile ? (
              <img
                src={`http://localhost:3065/${user.profile}`}
                alt={user.profile}
                onClick={() => setOpenProfileMenu((prev) => (prev = !prev))}
              />
            ) : (
              <img
                src={defaultProfile}
                alt="default profile"
                onClick={() => setOpenProfileMenu((prev) => (prev = !prev))}
              />
            )}

            <div className={`menu${openProfileMenu ? ' opened' : ' closed'}`}>
              <button>
                <CgProfile />
                프로필
              </button>
              <button>
                <BsGearWide />
                설정
              </button>
              <button onClick={onClickLogout}>로그아웃</button>
            </div>
          </StyledMenu>
        </div>
      </div>
    </StyledNavBar>
  );
};

export default NavBar;
