import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
// import { badgeData } from '@pages/About/AboutComponents/Badges/BadgeData';

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon-precomposed" href="/favicon2.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
