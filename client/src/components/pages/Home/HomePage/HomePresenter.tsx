import Head from 'next/head';
import { StyledHome } from './HomeStyle';
import Banner from '@pages/Home/HomeComponents/Banner';
import AboutSummary from '@pages/Home/HomeComponents/AboutSummary';
import BlogSummary from '@pages/Home/HomeComponents/BlogSummary';
import ContactSummary from '@pages/Home/HomeComponents/ContactSummary';
import { BlogPostRes } from '@app/services/blog/postApi';

// import type { NextPage } from 'next';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

interface Props {
  blogPostsData?: BlogPostRes;
}

const HomePresenter = ({ blogPostsData }: Props) => {
  return (
    <>
      <Head>
        <title>UYeong</title>
      </Head>
      <StyledHome>
        <Banner />
        <AboutSummary />
        <BlogSummary blogPostsData={blogPostsData} />
        <ContactSummary />
      </StyledHome>
    </>
  );
};

export default HomePresenter;
