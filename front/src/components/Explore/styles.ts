import styled from 'styled-components';
import { media } from '../../styles/media';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 950px;
  ${media.desktop} {
    width: 100%;
  }
`;

export const StyledSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;

  gap: 6px;
  width: 100%;
  margin-bottom: 10px;

  ::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  > :nth-child(18n + 3) {
    grid-column: span 2;
    grid-row: span 2;
  }
  > :nth-child(18n + 1) {
    grid-column: 1;
  }
  > :nth-child(18n + 2) {
    grid-column: 1;
  }

  > :nth-child(18n + 10) {
    grid-column: span 2;
    grid-row: span 2;
  }
  > :nth-child(18n + 11) {
    grid-column: 3;
  }
  > :nth-child(18n + 12) {
    grid-column: 3;
  }

  button {
    position: relative;
    overflow: hidden;
    padding: 0;

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      z-index: 1;
      opacity: 0;
      :hover {
        opacity: 1;
      }
    }

    .contents {
      img,
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .icon {
        position: absolute;
        top: 15px;
        right: 15px;
        color: white;
        filter: drop-shadow(0 0 2px gray);

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;
