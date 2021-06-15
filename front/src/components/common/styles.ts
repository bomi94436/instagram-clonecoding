import styled from 'styled-components';
import { media } from '../../styles/media';

export const StyledNavBar = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 54px;

  z-index: 2;

  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.border.gray};

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 950px;
    padding: 0 20px;
    ${media.desktop} {
      width: 100%;
    }

    .home-button {
      padding: 0;
      img {
        height: 29px;
      }
    }

    .icons {
      display: flex;
      align-items: center;

      .button {
        width: 22px;
        height: 22px;
        padding: 0;
        &:not(:first-child) {
          margin-left: 24px;
        }

        svg {
          width: 22px;
          height: 22px;
          color: black;
        }
      }
    }
  }
`;

export const StyledAppLayout = styled.div`
  .box {
    padding-top: 84px;
    background-color: rgb(250, 250, 250);
    min-height: 100vh;

    .children {
      display: flex;
      justify-content: center;
    }
  }
`;

export const StyledMenu = styled.div`
  position: relative;
  font-size: 14px;
  padding: 0;
  cursor: pointer;
  margin-left: 24px;

  img {
    width: 22px;
    height: 22px;
    border-radius: 70%;
  }

  .opened {
    transform: translate(0, 35px);
    opacity: 1;
    visibility: visible;
  }
  .closed {
    transform: translate(0, 0);
    opacity: 0;
    visibility: hidden;
  }

  .menu {
    position: absolute;
    top: 0;
    right: -20px;

    display: flex;
    flex-direction: column;

    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 8px ${({ theme }) => theme.border.gray};

    transition: all 0.3s ease;

    button {
      display: flex;
      align-items: center;

      width: 198px;
      height: 44px;
      padding: 8px 16px;
      text-align: left;

      svg {
        width: 16px;
        height: 16px;
        margin-right: 12px;
      }

      :hover {
        background-color: ${({ theme }) => theme.background.gray};
      }
    }

    button:nth-last-child(1) {
      border-top: 1px solid ${({ theme }) => theme.border.gray};
    }
  }

  .menu::after {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 26px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

export const StyledModal = styled.div<{ openModal: boolean }>`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.4);

  > div {
    @keyframes fade-in {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: fade-in 0.2s ease;
  }
`;
