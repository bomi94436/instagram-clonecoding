import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    //box-sizing: border-box;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
