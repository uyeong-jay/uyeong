import '@emotion/react';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}

export { lightTheme };
export { darkTheme };
