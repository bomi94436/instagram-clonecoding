import styled from 'styled-components';
import { media } from '../../styles/media';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 1000px;
  min-height: 100vh;
  ${media.desktop} {
    width: 100%;
  }
`;
