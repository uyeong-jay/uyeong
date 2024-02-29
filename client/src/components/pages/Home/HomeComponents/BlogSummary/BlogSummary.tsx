import React from 'react';
import styled from '@_settings/styled';
import { BlogPostRes } from '@app/services/blog/postApi';
import MiniBlogPostCard from '../MiniBlogPostCard/MiniBlogPostCard';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowRightIcon from '@icons/ArrowRightIcon';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import DetailButton from '@molecules/DetailButton';
import SummaryTitle from '../SummaryTitle';

const SECTION = {} as any;
const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

DIV.SliderWrapper = styled.div`
  border: 1px solid / blue;
  width: 230px;
  margin-top: 25px;

  & > button {
    // border: 1px solid black;
    position: absolute;
    right: 15px;
    bottom: 10px;
  }

  @media screen and (min-height: 500px) and (min-width: 850px) {
    margin-top: -10px;
  }
`;

interface Props {
  blogPostsData?: BlogPostRes;
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ArrowRightIcon className={className} onClick={onClick} style={{ ...style, display: 'none' /* , fill: 'red' */ }} />
  );
}
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ArrowLeftIcon className={className} onClick={onClick} style={{ ...style, display: 'none' /* , fill: 'red' */ }} />
  );
}

const settings = {
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const BlogSummary = ({ blogPostsData }: Props) => {
  return (
    <SECTION.Frame>
      <SummaryTitle text="BLOG" />
      <DIV.SliderWrapper>
        <Slider {...settings}>
          {blogPostsData?.posts?.map((post) => (
            <MiniBlogPostCard key={post._id} post={post} />
          ))}
        </Slider>
        <DetailButton link="/blog" />
      </DIV.SliderWrapper>
    </SECTION.Frame>
  );
};

export default BlogSummary;
