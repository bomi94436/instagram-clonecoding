import styled from 'styled-components';
import { media } from '../../styles/media';

export const Wrapper = styled.div`
  display: flex;
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
  }

  button .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    ${media.desktop} {
      flex-direction: column;
    }

    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 1;
    opacity: 0;
  }

  button .cover div {
    display: flex;
    align-items: center;

    font-size: 16px;
    font-weight: 700;
  }

  button .cover > :first-child {
    margin: 0 30px 0 0;
    ${media.desktop} {
      margin: 0 0 10px 0;
    }
  }

  button .cover div svg {
    width: 19px;
    height: 19px;
    margin-right: 8px;
  }

  button .cover:hover {
    opacity: 1;
  }

  button .contents img,
  button .contents video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button .contents .icon {
    position: absolute;
    top: 15px;
    right: 15px;
    color: white;
    filter: drop-shadow(0 0 2px gray);
  }

  button .contents .icon svg {
    width: 24px;
    height: 24px;
  }
`;
