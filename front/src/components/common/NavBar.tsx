import React, { useState } from 'react';
import { StyledNavBar, StyledMenu } from './styles';
import {
  BsGearWide,
  CgProfile,
  BsPlusSquare,
  BsPlusSquareFill,
  BsHouse,
  BsHouseFill,
  BsCursorFill,
  BsCursor,
} from 'react-icons/all';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from '../../lib/assets/InstagramLogo.png';
import defaultProfile from '../../lib/assets/default_profile.jpg';

interface props {
  user: UserInfo;
  onClickLogout: () => void;
}

const NavBar = ({
  user,
  onClickLogout,
  location,
}: props & RouteComponentProps) => {
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
          <button className="button">
            <Link to="/">
              {location.pathname === '/' ? <BsHouseFill /> : <BsHouse />}
            </Link>
          </button>

          <button className="button">
            <Link to="/explore">
              {location.pathname === '/explore' ? (
                <BsCursorFill />
              ) : (
                <BsCursor />
              )}
            </Link>
          </button>

          <button className="button">
            <Link to="/upload">
              {location.pathname === '/upload' ? (
                <BsPlusSquareFill />
              ) : (
                <BsPlusSquare />
              )}
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

export default withRouter(NavBar);
