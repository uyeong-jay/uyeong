import '@emotion/react';

//https://getbootstrap.com/docs/5.0/layout/breakpoints/
//https://kinsta.com/blog/responsive-web-design/
const breakpoint = {
  FHDPC: '1400px',
  HDPC: '1200px',
  PC: '992px',
  TABLET: '768px',
  MOBILE: '576px',
};

export const lightTheme = {
  BACKGROUND_COLOR: '#F4F1E9',
  COLOR: '#ada591',
  BP: breakpoint,
};

export const darkTheme = {
  BACKGROUND_COLOR: '#0D1117',
  COLOR: 'white',
  BP: breakpoint,
};

declare module '@emotion/react' {
  export interface Theme {
    BACKGROUND_COLOR: string;
    COLOR: string;
    BP: typeof breakpoint;
  }
}
