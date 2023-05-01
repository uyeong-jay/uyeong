import GlobalStyle from '@_settings/globalStyle';
import AppLayout from '@templates/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '@app/store';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@_settings/theme';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      {/* fontawsome icon  */}
      {/* <Script src={`${process.env.FONTAWESOME_KIT}`} crossOrigin="anonymous"></Script> */}
      <ThemeProvider theme={lightTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <AppLayout>
            <Component {...props.pageProps} />
          </AppLayout>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
