import styled from 'styled-components';
import { media } from '../../styles/media';

export const StyledNavBar = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 54px;

  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.border.gray};

  .content {
    display: flex;
    justify-content: space-between;

    width: 1000px;
    ${media.desktop} {
      width: 100%;
    }
  }
`;

export const StyledAppLayout = styled.div`
  .box {
    padding-top: 84px;
    background-color: rgb(250, 250, 250);

    .children {
      display: flex;
      justify-content: center;
    }
  }
`;
