import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  width: 100vw;
  height: 100vh;

  font-size: 14px;
  background: ${({ theme }) => theme.background.gray};
`;

export const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 348px;
  //height: 358px;

  padding: 10px 0;

  border: 1px solid ${({ theme }) => theme.border.gray};
  background: white;

  img {
    width: 175px;
    height: 51px;
    margin: 22px auto 12px;
  }

  p {
    text-align: center;
    font-size: 17px;
    color: ${({ theme }) => theme.fontColor.gray};
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    padding: 0 40px;
    margin-top: 24px;

    input {
      width: 256px;
      height: 20px;

      background: ${({ theme }) => theme.background.gray};
      border: 1px solid ${({ theme }) => theme.border.gray};
      border-radius: 5px;

      outline: none;
      padding: 9px 0 7px 8px;
      margin-bottom: 6px;

      &:focus {
        border: 1px solid #a6a6a6;
      }
    }

    .password {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      button {
        position: absolute;
        right: 8px;
        top: 0;

        padding: 0;

        width: 22px;
        height: 22px;

        background: none;

        * {
          width: 22px;
          height: 22px;
          color: black;
        }
      }
    }

    button {
      width: 266px;
      height: 30px;

      margin: 8px 0;

      font-weight: 600;
      color: white;
      background-color: ${({ theme }) => theme.background.blue};
      border-radius: 5px;

      &[disabled] {
        opacity: 0.5;
        cursor: default;
      }
    }
  }

  span.link {
    margin: 25px 0;
    color: black;
  }

  span {
    margin-bottom: 8px;
    color: #cd313e;
    text-align: center;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.fontColor.blue};
  font-weight: 600;
  text-decoration: none;
`;
