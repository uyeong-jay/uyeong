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
import '@_settings/fontStyles.css';
import Head from 'next/head';

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

interface Props extends AppProps {
  multiLangDescription: string;
  theme: typeof LIGHT_THEME | typeof DARK_THEME;
}

function MyApp({ Component, multiLangDescription, theme: themeInCookie, ...rest }: Props) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [cookies, setCookie] = useCookies(['theme']);
  const theme = useMemo(() => cookies.theme || themeInCookie, [cookies.theme, themeInCookie]);

  const onClickDarkMode = useCallback(() => {
    setCookie('theme', theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME, { path: '/' });
  }, [setCookie, theme]);

  useEffect(() => {
    if (!cookies.theme) return setCookie('theme', LIGHT_THEME, { path: '/' });
  }, [cookies.theme, setCookie]);

  return (
    <>
      <ThemeProvider theme={theme === LIGHT_THEME ? lightTheme : darkTheme}>
        <Provider store={store}>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover"
            />
            <meta name="description" content={multiLangDescription} />
            <meta property="og:title" content="UYeong" />
            <meta property="og:description" content={multiLangDescription} />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/uyeong/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1733820910/uyeong-blog/og_image/uyeongblog_tm4nhd.png"
            />
            <meta property="og:url" content="https://uyeong.com" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="UYeong Blog" />

            <meta name="msvalidate.01" content="0BCD1249AD6AB561B6107ACF8E0BD729" />
          </Head>
          <GlobalStyle />
          <AppLayout isDarkTheme={theme === DARK_THEME} onClickDarkMode={onClickDarkMode}>
            <Component {...props.pageProps} />
          </AppLayout>
        </Provider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = cookieParser(ctx.req?.headers?.cookie);
  const lang = ctx.req?.headers['accept-language']?.split(',')[0] || 'en';

  const multiLangDescription = lang.startsWith('ko')
    ? '안녕하세요! UYeong 블로그입니다. 개발 및 다양한 일상 이야기들을 기록하고 있습니다.'
    : 'Welcome to UYeong Blog - Sharing stories about development and everyday life.';

  return { multiLangDescription, theme: cookies.theme || LIGHT_THEME };
};
export default MyApp;
