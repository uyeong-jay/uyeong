import Head from 'next/head';
import Banner from './Banner';
import AboutSummary from './AboutSummary';
import { StyledMain } from './HomeStyle';
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
      <StyledMain>
        <Banner />
        <BlogSummary />
        <AboutSummary />
        <ContactSummary />
      </StyledMain>
    </>
  );
};

export default HomePresenter;
