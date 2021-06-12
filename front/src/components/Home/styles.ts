import styled from 'styled-components';
import { media } from '../../styles/media';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 1000px;
  ${media.desktop} {
    width: 100%;
  }

  .button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .right {
    ${media.desktop} {
      display: none;
    }
    width: 300px;
    margin-left: 50px;

    .info {
      position: fixed;
      width: 300px;

      .profile {
        display: flex;
        align-items: center;
        margin: 18px 0;

        img {
          width: 56px;
          height: 56px;
          border-radius: 70%;
          border: 1px solid ${({ theme }) => theme.border.gray};
        }

        span {
          display: block;
          margin-left: 14px;

          font-size: 14px;
          font-weight: 600;
        }
      }

      .follow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;

        .num {
          font-weight: 600;
        }
      }
    }
  }
`;

export const StyledCardWrapper = styled.div`
  position: relative;
  // 278 x 318
  .emoji-picker {
    position: absolute;
    bottom: 50px;
    left: 10px;
    z-index: 1;
  }
`;

export const StyledCard = styled.div`
  width: 600px;
  border: 1px solid ${({ theme }) => theme.border.gray};
  border-radius: 5px;
  background-color: white;
  margin-bottom: 60px;

  .view {
    width: 600px;
    height: 600px;
    background-color: lightgray;
  }

  .top {
    height: 42px;
    display: flex;
    justify-content: space-between;
    padding: 16px;

    div {
      display: flex;
      align-items: center;
    }

    img {
      width: 42px;
      height: 42px;
      border-radius: 70%;
      border: 1px solid ${({ theme }) => theme.border.gray};
    }

    span {
      margin-left: 14px;

      font-size: 14px;
      font-weight: 600;
    }
  }

  .content {
    padding: 0 14px;
    font-size: 14px;

    .icons {
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 40px;

      .left {
        display: flex;
      }

      button {
        padding: 0;
        height: 24px;

        * {
          width: 24px;
          height: 24px;
        }

        :nth-child(2) {
          margin-left: 16px;
        }
      }
    }

    .liked {
      margin-bottom: 8px;
      span {
        font-weight: 600;
      }
    }

    .text {
      white-space: pre-wrap;

      > :first-child {
        font-weight: 600;
      }
    }

    .time {
      display: flex;
      align-items: center;

      height: 19px;
      margin-bottom: 4px;

      font-size: 10px;
      font-weight: 600;
      color: ${({ theme }) => theme.fontColor.gray};
    }
  }

  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 55px;
    padding: 0 14px;
    font-size: 14px;
    border-top: 1px solid rgba(var(--ce3, 239, 239, 239), 1);

    .left {
      display: flex;
      align-items: center;
      flex-grow: 1;

      .emoji {
        padding: 8px 16px 8px 0;
        .icon {
          width: 24px;
          height: 24px;
        }
      }
    }

    .submit {
      font-weight: 600;
      color: ${({ theme }) => theme.fontColor.blue};
    }

    .disabled {
      opacity: 0.5;
      cursor: default;
    }

    input {
      width: 100%;
      border: none;
      background: none;
      outline: none;
    }
  }
`;

export const StyledSlider = styled(Slider)`
  position: relative;
  width: 600px;
  height: 600px;

  img,
  video {
    width: 600px;
    height: 600px;
    object-fit: scale-down;
  }

  .video {
    position: relative;
    width: 600px;
    height: 600px;
  }

  .slick-arrow {
    opacity: 0.8;
  }

  .slick-disabled {
    cursor: default;
    ::before {
      display: none;
    }
  }

  .slick-prev {
    position: absolute;
    left: 10px;
    top: 50%;
    z-index: 1;
  }

  .slick-next {
    position: absolute;
    right: 10px;
    top: 50%;
  }

  .slick-dots {
    width: 600px;

    li {
      margin: 0 2px;
      width: 6px;
      height: 6px;
    }
    button {
      padding: 0;
      width: 6px;
      height: 6px;
    }

    button::before {
      content: '';
      opacity: 0.25;
      background-color: black;
      border-radius: 70%;
      width: 6px;
      height: 6px;
    }
  }

  li.slick-active button::before {
    opacity: 1;
    background-color: ${({ theme }) => theme.fontColor.blue};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor.navy};
`;

export const StyledButton = styled.button<{ isPlayed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 600px;
  height: 600px;

  padding: 0;
  color: white;
  opacity: ${(props) => (props.isPlayed === false ? 0.8 : 0)};
  filter: drop-shadow(0 0 1px gray);
  transition: all 0.3s ease;

  svg {
    width: 70px;
    height: 70px;
  }
`;
