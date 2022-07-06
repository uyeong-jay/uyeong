import Head from 'next/head';
import styled from '@_settings/styled';
import Banner from './Banner';
import AboutSummary from './AboutSummary';
import BlogSummary from './BlogSummary';
import ContactSummary from './ContactSummary';

// import type { NextPage } from 'next';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

const StyledMain = styled.main`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HomePresenter = () => {
  return (
    <>
      <Head>
        <title>UYeong</title>
      </Head>
      <StyledMain>
        <Banner />
        <AboutSummary />
        <BlogSummary />
        <ContactSummary />
      </StyledMain>
    </>
  );
};

export default HomePresenter;
