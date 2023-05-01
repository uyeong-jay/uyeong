import '@emotion/react';

//https://getbootstrap.com/docs/5.0/layout/breakpoints/
//https://kinsta.com/blog/responsive-web-design/
const breakpoint = {
  FHDPC: '1400px',
  HDPC: '1200px', //내 노트북: 1270px
  PC: '992px',
  TABLET: '768px',
  MOBILE: '576px', //내폰 400px
  // - 1024px(헤더최대),
  // - 833px(헤더최소),
  // - 734px(내용최소),
  // - 가장 작은 폰: 315px(333px 브라우저 150% 확대 + 브라우저 가로 최대 축소)
  // - 내폰 화면: 400px(브라우저 125% 확대 + 브라우저 가로 최대 축소)
};

export const lightTheme = {
  BACKGROUND_COLOR: '#f5f5f7',
  COLOR: '#333333',
  BP: breakpoint,
};

export const darkTheme = {
  BACKGROUND_COLOR: 'black',
  COLOR: 'white',
  BP: breakpoint,
};

type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
