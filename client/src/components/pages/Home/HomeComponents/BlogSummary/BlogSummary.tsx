import React from 'react';
import styled from '@_settings/styled';
import { BlogPostRes } from '@app/services/blog/postApi';
import MiniBlogPostCard from '../MiniBlogPostCard/MiniBlogPostCard';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowRightIcon from '@icons/ArrowRightIcon';
import ArrowLeftIcon from '@icons/ArrowLefttIcon';

const ARTICLE = {} as any;
const DIV = {} as any;

ARTICLE.Layout = styled.article`
  border: 2px solid #dadada;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -50px;
  width: 100%;
  height: 350px;
  margin-bottom: 10%;
`;

DIV.SliderWrapper = styled.div`
  // border: 1px solid black;
  margin: 0 auto;
  width: 80%;
`;

interface Props {
  blogPostsData?: BlogPostRes;
}

// - Responsive breakpoints
// FHDPC: 1900px(min) ~
// HDPC: 1200px(min) ~ 1900px(max)
// LAPTOP, PC: 1024px(min) ~ 1200px(max)
// TABLET_L: 960px(min) ~ 1024px(max)
// TABLET_P: 640px(min) ~ 960px(max)
// MOBILE_L: 480px(min) ~ 640px(max)
// MOBILE_P: 350px(min) ~ 480px(max)

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return <ArrowRightIcon className={`${className}`} onClick={onClick} style={{ ...style, fill: '#777777' }} />;
}
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <ArrowLeftIcon className={`${className} reverse`} onClick={onClick} style={{ ...style, fill: '#777777' }} />;
}

const BlogSummary = ({ blogPostsData }: Props) => {
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 734,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ARTICLE.Layout>
      <div>Blog</div>
      <DIV.SliderWrapper>
        <Slider {...settings}>
          {blogPostsData?.posts?.map((post) => (
            <MiniBlogPostCard key={post._id} post={post} />
          ))}
        </Slider>
      </DIV.SliderWrapper>
    </ARTICLE.Layout>
  );
};

export default BlogSummary;
