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

ARTICLE.Frame = styled.article`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 50px 0;
`;

DIV.BSTitleWrapper = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;

  & > h3 {
    // border: 1px solid black;
    font-size: 30px;
    font-weight: 400;
    color: ${({ theme }) => theme.FONT_C};
  }
`;
DIV.SliderWrapper = styled.div`
  // border: 1px solid black;
  // background-color: black;
  width: 70%;
  height: auto;
  // transform: scale(0.8);

  & > button {
    // border: 1px solid black;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

interface Props {
  blogPostsData?: BlogPostRes;
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ArrowRightIcon
      className={`${className}`}
      onClick={onClick}
      style={{ ...style, display: 'none' /*  fill: 'gray' */ }}
    />
  );
}
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ArrowLeftIcon
      className={`${className}`}
      onClick={onClick}
      style={{ ...style, display: 'none' /*  fill: 'gray' */ }}
    />
  );
}

const settings = {
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const BlogSummary = ({ blogPostsData }: Props) => {
  return (
    <ARTICLE.Frame>
      <DIV.BSTitleWrapper>
        <h3>BLOG</h3>
      </DIV.BSTitleWrapper>
      <DIV.SliderWrapper>
        <Slider {...settings}>
          {blogPostsData?.posts?.map((post) => (
            <MiniBlogPostCard key={post._id} post={post} />
          ))}
        </Slider>
        <DetailButton link="/blog" />
      </DIV.SliderWrapper>
    </ARTICLE.Frame>
  );
};

export default BlogSummary;
