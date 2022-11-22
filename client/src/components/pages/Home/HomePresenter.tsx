import Head from 'next/head';
import Banner from './Banner';
import AboutSummary from './AboutSummary';
import { StyledHome } from './HomeStyle';
import BlogSummary from './BlogSummary';
import ContactSummary from './ContactSummary';

// import type { NextPage } from 'next';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

const HomePresenter = () => {
  return (
    <>
      <Head>
        <title>UYeong</title>
      </Head>
      <StyledHome>
        <Banner />
        <BlogSummary />
        <AboutSummary />
        <ContactSummary />
      </StyledHome>
    </>
  );
};

export default HomePresenter;
