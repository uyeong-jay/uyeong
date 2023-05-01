import React from 'react';
import styled from '@_settings/styled';

const SECTION = {} as any;

SECTION.Layout = styled.section`
  // border: 1px solid red;
  // border-bottom: 1px solid #999999; //다크모드
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -50px;
  left: 0;
  width: 100%; //가로 스크롤 방지
  height: 100vh;

  & > .scrolling-words-box {
    height: 3rem;
    margin: auto;
    overflow: hidden;

    & > ul {
      margin: 0 0.625rem;
      padding: 0;
      animation: scroll-up 10s infinite 2s;

      & > li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        list-style: none;
        font-size: 1.5rem;
        @media screen and (max-width: 734px) {
          font-size: 1.2rem;
        }
        font-weight: 600;
      }
      & > li:nth-of-type(1) {
        min-width: 150px;
      }
      & > li:nth-of-type(2) {
        min-width: 150px;
      }
      & > li:nth-of-type(3) {
        min-width: 300px;
      }
      & > li:nth-of-type(5) {
        min-width: 150px;
      }

      @keyframes scroll-up {
        15%,
        25% {
          transform: translateY(-20%);
        }
        40%,
        50% {
          transform: translateY(-40%);
        }
        65%,
        75% {
          transform: translateY(-60%);
        }
        90%,
        100% {
          transform: translateY(-80%);
        }
      }
    }
  }
`;

const Banner = () => {
  return (
    <SECTION.Layout>
      <div className="scrolling-words-box">
        <ul>
          <li>Hi there !</li>
          <li>I&apos;m UYeong</li>
          <li>Thank you for visiting my blog</li>
          <li>❤️</li>
          <li>Hi there !</li>
        </ul>
      </div>
    </SECTION.Layout>
  );
};

export default Banner;
