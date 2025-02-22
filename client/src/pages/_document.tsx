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
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display&family=Square+Peg&family=Baloo+Bhaijaan+2&family=Sono&display=block"
            rel="stylesheet"
          /> */}
          <link rel="preload" href="/fonts/MaplestoryOTFBold.woff" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/GangwonEdu_OTFBoldA.woff" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/subset-SquarePeg-Regular.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/subset-BalooBhaijaan2-Regular.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/subset-SonoMonospace-Regular.woff2" as="font" crossOrigin="anonymous" />

          <link rel="apple-touch-icon-precomposed" href="/favicon2.png" />

          {/* badge images preload */}
          {/* {badgeData.flatMap((category) =>
            category.contents.map((badge, index) => (
              <link
                key={`${category.name}-${index}`}
                rel="preload"
                href={`https://img.shields.io/badge/${badge.name}-${badge.color}?style=plastic&logo=${badge.logoName}&logoColor=white`}
                as="style"
                crossOrigin="anonymous"
              />
            ))
          )} */}
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
