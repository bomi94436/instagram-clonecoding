// 스타일 - 타입정의 모음

// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      white: string;
    };
    fontColor: {
      black: string;
    };
  }
}
