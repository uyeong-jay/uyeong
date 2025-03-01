import Head from 'next/head';
import { DIV, MAIN } from './HomeStyle';
import Banner from '@pages/Home/HomeComponents/Banner';
import AboutSummary from '@pages/Home/HomeComponents/AboutSummary';
import BlogSummary from '@pages/Home/HomeComponents/BlogSummary';
import { BlogPostRes } from '@app/services/blog/postApi';
import TagsSummary from '../HomeComponents/TagsSummary';
import { useState } from 'react';

interface Props {
  blogPostsData?: BlogPostRes;
}

const activeBtnArr = Array.from({ length: 3 }, (_, index) => index);

const HomePresenter = ({ blogPostsData }: Props) => {
  const [activeBtnNum, setActiveBtnNum] = useState(1);

  const onClickActiveBtn = (btnNum: number) => {
    setActiveBtnNum(btnNum);
  };

  return (
    <>
      <Head>
        <title>UYeong</title>
        <link rel="preload" href="/fonts/subset-SquarePeg-Regular.woff2" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/subset-SonoMonospace-Regular.woff2" as="font" crossOrigin="anonymous" />
      </Head>
      <MAIN.Frame>
        <DIV.ContainerWidth>
          <DIV.ContainerHeight>
            <DIV.BannerBlock>
              <Banner />
            </DIV.BannerBlock>
            <DIV.SummaryBlock>
              {activeBtnNum === 1 && <AboutSummary />}
              {activeBtnNum === 2 && <BlogSummary blogPostsData={blogPostsData} />}
              {activeBtnNum === 3 && <TagsSummary />}
              <DIV.ActiveBtns>
                {activeBtnArr.map((_, i) => (
                  <button
                    className={activeBtnNum === i + 1 ? 'active' : ''}
                    key={i}
                    onClick={() => onClickActiveBtn(i + 1)}
                  ></button>
                ))}
              </DIV.ActiveBtns>
            </DIV.SummaryBlock>
          </DIV.ContainerHeight>
        </DIV.ContainerWidth>
      </MAIN.Frame>
    </>
  );
};

export default HomePresenter;
