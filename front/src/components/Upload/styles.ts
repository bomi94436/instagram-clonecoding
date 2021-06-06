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
    .upload-button {
      width: 100%;
      height: 30px;

      margin-bottom: 8px;

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
    margin-left: 50px;

    textarea {
      resize: none;
      font-size: 16px;
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
  width: 250px;
  padding: 8px;
  background: ${(props) => (props.isDraggingOver ? 'lightblue' : 'lightgrey')};
`;

export const StyledCard = styled('div')<{ isDragging: boolean }>`
  user-select: none;
  overflow: hidden;

  img {
    width: 100%;
    transition: all 0.3s ease;

    opacity: ${(props) => (props.isDragging ? '0.8' : '1')};
  }
`;
