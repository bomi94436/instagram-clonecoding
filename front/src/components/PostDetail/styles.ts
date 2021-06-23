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

  > div {
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

    .top {
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
        display: flex;
        white-space: pre-wrap;
        margin-bottom: 16px;
        align-items: flex-start;
        flex-grow: 1;
      }

      .comment {
        justify-content: space-between;

        > div {
          display: flex;
        }

        button {
          margin-top: 5px;
          svg {
            width: 12px;
            height: 12px;
          }
        }
      }

      .content-middle,
      .comment-middle {
        display: flex;
        flex-direction: column;

        > :nth-child(2) {
          margin: 16px 0 4px;
        }
      }

      .time {
        margin-right: 12px;
        font-weight: 600;
        font-size: 12px;
        color: ${({ theme }) => theme.fontColor.gray};
      }

      .reply-button {
        cursor: pointer;
        font-weight: 700;
        font-size: 12px;
        color: ${({ theme }) => theme.fontColor.gray};
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
    }
  }
`;
