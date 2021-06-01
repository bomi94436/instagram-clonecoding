import React from 'react';
import { NavBarContainer } from '../../containers';
import { StyledAppLayout } from './styles';

interface props {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = ({ children }: props) => {
  return (
    <StyledAppLayout>
      <NavBarContainer />
      <div className="box">
        <div className="children">{children}</div>
      </div>
    </StyledAppLayout>
  );
};

export default AppLayout;
