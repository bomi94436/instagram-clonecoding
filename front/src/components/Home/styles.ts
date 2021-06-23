import styled from 'styled-components';
import { media } from '../../styles/media';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    z-index: 4;
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

        .fill-heart {
          svg {
            color: ${({ theme }) => theme.icon.red};
          }
        }

        .fade {
          @keyframes heart-beat {
            0% {
              transform: scale(0.5);
            }
            70% {
              transform: scale(1.5);
            }
            100% {
              transform: scale(1);
            }
          }
          animation: heart-beat 0.2s linear;
        }
      }

      button {
        padding: 0;
        height: 24px;
        z-index: 3;

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
`;

export const StyledSlider = styled(Slider)<{ isModal: boolean }>`
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
    bottom: ${(props) => (props.isModal ? '10px' : '-27px')};

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
      background-color: gray;
      border-radius: 70%;
      width: 6px;
      height: 6px;
    }
  }

  li.slick-active button::before {
    opacity: 1;
    background-color: ${(props) =>
      props.isModal ? 'white' : props.theme.fontColor.blue};
  }
`;

export const StyledPlayButton = styled.button<{ isPlayed: boolean }>`
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

export const StyledCardContent = styled.div<{ isOpened: boolean }>`
  white-space: pre-wrap;
  line-height: 18px;
  margin-bottom: 4px;

  button {
    padding: 0;
    color: ${({ theme }) => theme.fontColor.gray};
    font-weight: 600;
  }

  > :first-child {
    font-weight: 600;
  }
  > :nth-child(2) {
    [isOpened='false'] {
      display: -webkit-box;
      overflow: hidden;
      word-break: break-word;

      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
`;

export const StyledCardComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    height: 18px;
    margin-bottom: 4px;
  }

  button {
    padding: 0;
    color: ${({ theme }) => theme.fontColor.gray};
    font-weight: 600;
  }

  .nickname {
    font-weight: 600;
  }

  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export const StyledMorePostModal = styled.div`
  width: 400px;
  ${media.tablet} {
    width: 260px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 5px;

  button {
    height: 48px;

    :not(:first-child) {
      border-top: 1px solid ${({ theme }) => theme.border.gray};
    }

    &.delete {
      font-weight: 600;
      color: ${({ theme }) => theme.fontColor.red};
    }
  }
  background-color: white;
`;

export const StyledCardCommentForm = styled.form`
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
`;
