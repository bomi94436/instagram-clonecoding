import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor.navy};
`;

export const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  svg {
    width: 60px;
    height: 60px;
    color: lightgray;
  }
`;
