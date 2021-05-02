// 스타일 - 타입정의 모음

// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      gray: string;
    };
    fontColor: {
      black: string;
      gray: string;
      blue: string;
    };
    border: {
      gray: string;
    };
  }
}
