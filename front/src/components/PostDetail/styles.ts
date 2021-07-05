import styled from 'styled-components';

export const StyledPostDetailModal = styled.div`
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

  > article {
    position: relative;
    display: flex;
  }

  .modal-left {
    width: 600px;
    height: 600px;
    background-color: lightgray;
  }

  .modal-right {
    display: flex;
    flex-direction: column;

    width: 335px;
    height: 600px;
    background-color: white;

    img {
      width: 32px;
      height: 32px;
      border-radius: 70%;
      margin-right: 18px;
      border: 1px solid ${({ theme }) => theme.border.gray};
    }

    span {
      font-size: 14px;

      &.nickname {
        font-weight: 600;
      }
    }

    header {
      display: flex;
      justify-content: space-between;

      height: 39px;
      padding: 16px;
      border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);

      div {
        display: flex;
        align-items: center;
      }
    }

    .middle::-webkit-scrollbar {
      display: none;
    }

    .middle {
      padding: 16px;
      overflow-y: scroll;
      flex-grow: 1;
      -ms-overflow-style: none;
      overflow-anchor: none;

      .content,
      .comment {
        position: relative;
        display: flex;
        white-space: pre-wrap;
        margin-bottom: 16px;
        align-items: flex-start;
        flex-grow: 1;
      }

      .content-middle,
      .comment-middle {
        display: flex;
        flex-direction: column;

        > :nth-child(2) {
          margin: 16px 0 4px;
        }
      }

      .comment {
        justify-content: space-between;

        > div {
          display: flex;
        }

        :hover {
          .more-button {
            display: block;
          }
        }

        .more-button {
          position: absolute;
          top: -8px;
          right: 24px;

          display: none;

          padding: 16px;
          background: radial-gradient(
            rgba(255, 255, 255, 0.9) 60%,
            rgba(0, 0, 0, 0)
          );

          svg {
            width: 16px;
            height: 16px;
            color: ${({ theme }) => theme.fontColor.gray};
          }
        }

        .heart-button {
          margin-top: 8px;
          svg {
            width: 12px;
            height: 12px;
          }
        }
      }

      .reply-cover {
        margin-left: 54px;

        > div:first-child {
          display: flex;
          align-items: center;
          margin: 16px 0;

          div:first-child {
            width: 24px;
            border-bottom: 1px solid ${({ theme }) => theme.fontColor.gray};
            margin-right: 16px;
          }
        }
      }

      .reply-button {
        cursor: pointer;
        font-weight: 700;
        font-size: 12px;
        color: ${({ theme }) => theme.fontColor.gray};
      }
    }

    .bottom {
      border-top: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
      margin-top: 4px;
      padding: 4px 16px 0 16px;

      svg {
        width: 24px;
        height: 24px;
      }

      .icons {
        display: flex;
        justify-content: space-between;

        button {
          padding: 8px;
        }
        button:first-child {
          padding-left: 0;
        }
        button:last-child {
          padding-right: 0;
        }

        .fill-heart {
          svg {
            color: ${({ theme }) => theme.icon.red};
          }
        }
      }

      .liked {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 4px;
        span {
          font-weight: 600;
        }
      }
    }

    .time {
      margin-right: 12px;
      font-weight: 600;
      font-size: 12px;
      color: ${({ theme }) => theme.fontColor.gray};
    }
  }
`;
