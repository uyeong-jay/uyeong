import GlobalStyle from '@_settings/globalStyle';
import AppLayout from '@templates/AppLayout';
import type { AppProps } from 'next/app';
import Script from 'next/script';

import { Provider } from 'react-redux';
import store from '@app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* fontawsome icon  */}
      <Script src={`${process.env.FONTAWESOME_KIT}`} crossOrigin="anonymous"></Script>
      <GlobalStyle />
      <Provider store={store}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </>
  );
}

export default MyApp;
