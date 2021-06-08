import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      gray: string;
      blue: string;
    };
    fontColor: {
      black: string;
      gray: string;
      blue: string;
      red: string;
      navy: string;
    };
    border: {
      gray: string;
    };
  }
}
