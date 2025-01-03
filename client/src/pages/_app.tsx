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
            <meta property="og:title" content="Uyeong" />
            <meta property="og:description" content={multiLangDescription} />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/uyeong/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1733820910/uyeong-blog/uyeongblog_tm4nhd.png"
            />
            <meta property="og:url" content="https://uyeong.com" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Uyeong's Blog" />
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
    ? '안녕하세요! 개발, 여행, 요리 등 제 다양한 일상들을 기록하는 블로그입니다. 방문해 주셔서 감사합니다. 좋은 하루 되세요!'
    : 'Hi! Welcome to my blog where I share my experiences in development, travel, cooking, and everyday life. Thank you for visiting, and have a great day!';

  return { multiLangDescription, theme: cookies.theme || LIGHT_THEME };
};
export default MyApp;
