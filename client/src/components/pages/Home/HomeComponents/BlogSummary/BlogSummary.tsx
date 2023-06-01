import React from 'react';
import styled from '@_settings/styled';
import { BlogPostRes } from '@app/services/blog/postApi';
import MiniBlogPostCard from '../MiniBlogPostCard/MiniBlogPostCard';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowRightIcon from '@icons/ArrowRightIcon';
import ArrowLeftIcon from '@icons/ArrowLefttIcon';
import DetailButton from '@molecules/DetailButton';

const ARTICLE = {} as any;
const DIV = {} as any;

ARTICLE.Layout = styled.article`
  // border: 1px solid black;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -50px;
  width: 100%;
  height: 350px;
  margin-top: 50px;
  margin-bottom: 100px;

  & > h3 {
    // border: 1px solid black;
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 50px;
  }
`;

DIV.SliderWrapper = styled.div`
  // border: 1px solid black;
  position: relative;
  margin: 0 auto;
  width: 1220px;

  @media screen and (max-width: 1450px) {
    width: 920px;
  }
  @media screen and (max-width: 1060px) {
    width: 600px;
  }
  @media screen and (max-width: 700px) {
    width: 320px;
  }

  & > button {
    // border: 1px solid black;
    position: absolute;
    right: 0px;
    bottom: -60px;
  }
`;

interface Props {
  blogPostsData?: BlogPostRes;
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return <ArrowRightIcon className={`${className}`} onClick={onClick} style={{ ...style, fill: 'gray' }} />;
}
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <ArrowLeftIcon className={`${className} reverse`} onClick={onClick} style={{ ...style, fill: 'gray' }} />;
}

const settings = {
  infinite: true,
  speed: 1500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1060,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        nextArrow: <></>,
        prevArrow: <></>,
      },
    },
  ],
};

const BlogSummary = ({ blogPostsData }: Props) => {
  return (
    <ARTICLE.Layout>
      <h3>Blog</h3>
      <DIV.SliderWrapper>
        <Slider {...settings}>
          {blogPostsData?.posts?.map((post) => (
            <MiniBlogPostCard key={post._id} post={post} />
          ))}
        </Slider>
        <DetailButton link="/blog" />
      </DIV.SliderWrapper>
    </ARTICLE.Layout>
  );
};

export default BlogSummary;
