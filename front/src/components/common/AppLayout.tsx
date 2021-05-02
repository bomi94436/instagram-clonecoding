import React from 'react';
import { StyledAppLayout } from './styles';
import NavBar from './NavBar';

interface props {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = ({ children }: props) => {
  return (
    <StyledAppLayout>
      <NavBar />
      <div className="box">
        <div className="children">{children}</div>
      </div>
    </StyledAppLayout>
  );
};

export default AppLayout;
