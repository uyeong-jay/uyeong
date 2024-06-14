import GlobalStyle from '@_settings/globalStyle';
import AppLayout from '@templates/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '@app/store';
import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@_settings/theme';
import { useCallback, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import cookieParser from '@utils/cookieParser';

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

interface Props extends AppProps {
  theme: typeof LIGHT_THEME | typeof DARK_THEME;
}

function MyApp({ Component, theme: themeInCookie, ...rest }: Props) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [cookies, setCookie] = useCookies(['theme']);
  const theme = useMemo(() => cookies.theme ?? themeInCookie, [cookies.theme, themeInCookie]);

  const onClickDarkMode = useCallback(() => {
    setCookie('theme', theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  }, [setCookie, theme]);

  useEffect(() => {
    if (!cookies.theme) return setCookie('theme', LIGHT_THEME);

    // 특정 이름을 포함하는 쿠키 가져오기
    const getCookiesByName = (name: string) => {
      const cookies = document.cookie.split('; ');
      const filteredCookies = cookies.filter((cookie) => cookie.includes(name));
      return filteredCookies;
    };

    //쿠키 중복 생성될시 현재 쿠키 가져오기
    const themeCookies = getCookiesByName('theme');
    const currThemeCookie = themeCookies[themeCookies.length - 1].split('=')[1];
    setCookie('theme', currThemeCookie);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThemeProvider theme={theme === LIGHT_THEME ? lightTheme : darkTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <AppLayout>
            <button onClick={onClickDarkMode}>Toggle</button>
            <Component {...props.pageProps} />
          </AppLayout>
        </Provider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = cookieParser(ctx.req?.headers?.cookie);
  return { theme: cookies.theme || LIGHT_THEME };
};
export default MyApp;
