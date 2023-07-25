import Head from 'next/head';
import { DIV, MAIN } from './HomeStyle';
import Banner from '@pages/Home/HomeComponents/Banner';
import AboutSummary from '@pages/Home/HomeComponents/AboutSummary';
import BlogSummary from '@pages/Home/HomeComponents/BlogSummary';
import { BlogPostRes } from '@app/services/blog/postApi';
import TagsSummary from '../HomeComponents/TagsSummary';

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
      <MAIN.Layout>
        <DIV.ContainerWidth>
          <DIV.ContainerHeight>
            <DIV.BannerBlock>
              <Banner />
            </DIV.BannerBlock>
            <DIV.SummaryBlock>
              <AboutSummary />
              <BlogSummary blogPostsData={blogPostsData} />
              <TagsSummary />
            </DIV.SummaryBlock>
          </DIV.ContainerHeight>
        </DIV.ContainerWidth>
      </MAIN.Layout>
    </>
  );
};

export default HomePresenter;
