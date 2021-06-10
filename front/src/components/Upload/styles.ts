import styled from 'styled-components';
import { media } from '../../styles/media';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 1000px;
  min-height: 100vh;
  ${media.desktop} {
    width: 100%;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;

    .upload-button {
      width: 282px;
      height: 30px;

      margin-bottom: 16px;

      font-weight: 600;
      color: white;
      background-color: ${({ theme }) => theme.background.blue};
      border-radius: 5px;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 30px;

    textarea {
      resize: none;
      font-size: 16px;
      padding: 16px;
      border: 1px solid ${({ theme }) => theme.border.gray};
      border-radius: 5px;

      ::placeholder {
        font-size: 16px;
      }
    }

    button {
      width: 60px;
      height: 30px;

      margin-top: 8px;

      font-weight: 600;
      color: white;
      background-color: ${({ theme }) => theme.background.blue};
      border-radius: 5px;
    }
  }
`;

export const StyledTable = styled('div')<{ isDraggingOver: boolean }>`
  width: 350px;
`;

export const StyledCard = styled('div')<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  user-select: none;
  overflow: hidden;

  :hover {
    button {
      opacity: 1;
    }
  }

  .picture {
    position: relative;
    img,
    video {
      width: 100%;
      margin: 8px 0;
      transition: all 0.2s ease;

      opacity: ${(props) => (props.isDragging ? '0.8' : '1')};
    }

    .icon {
      position: absolute;
      top: 15px;
      right: 7px;

      color: white;
      opacity: 0.8;
      filter: drop-shadow(0 0 1px gray);
    }
  }

  button {
    transition: all 0.2s ease;
    opacity: 0;
    :first-child {
      cursor: grab;
    }
    :last-child {
      color: ${({ theme }) => theme.fontColor.red};
    }
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;
