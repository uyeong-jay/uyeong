import GlobalStyle from '@_settings/globalStyle';
import AppLayout from '@templates/AppLayout';
import { Provider } from 'react-redux';
import wrapper from '@app/store';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import type { AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  // const persistor = persistStore(store);

  return (
    <>
      {/* fontawsome icon  */}
      <Script src={`${process.env.FONTAWESOME_KIT}`} crossOrigin="anonymous"></Script>

      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <GlobalStyle />
        <AppLayout>
          <Component {...props.pageProps} />
        </AppLayout>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}

export default MyApp;
