import GlobalStyle from '@_settings/globalStyle';
import AppLayout from '@templates/AppLayout';
import type { AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* fontawsome icon  */}
      <Script src={`${process.env.FONTAWESOME_KIT}`} crossOrigin="anonymous"></Script>
      <GlobalStyle />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

export default MyApp;
