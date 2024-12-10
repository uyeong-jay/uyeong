import React from 'react';
import styled from '@_settings/styled';
import HeartIcon from '@icons/HeartIcon';

const SECTION = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid red;
  position: relative;
  width: 100%;
  height: 100%;

  & > .scrolling-words-box {
    // border: 1px solid black;
    position: absolute;
    top: 39%; // 모바일 화면에서의 높이
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 320px;
    height: 3.5rem; //높이 맞추기 1
    overflow: hidden;
    font-family: 'Square Peg', cursive;
    color: ${({ theme }) => theme.FONT_C};

    & > ul {
      animation: scroll-up 10s infinite 2s;

      & > li {
        // border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3.5rem; //높이 맞추기 2
        list-style: none;
        font-size: 2.3rem;
        font-weight: 600;

        & .heart-icon {
          // border: 1px solid black;
          width: 50px;
          height: 60px;

          g {
            fill: ${({ theme }) => theme.FONT_C};
          }
        }
      }

      & > li:nth-of-type(3) {
        // border: 1px solid red;
        white-space: nowrap;
        font-size: 2rem;
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

  @media screen and (min-height: 500px) and (min-width: 850px) {
    & > .scrolling-words-box {
      top: 45%;
    }
  }
`;

const Banner = () => {
  return (
    <SECTION.Frame>
      <div className="scrolling-words-box">
        <ul>
          <li>Hi there !</li>
          <li>I&apos;m UYeong</li>
          <li>Thank you for visiting my blog</li>
          <li>
            <HeartIcon />
          </li>
          <li>Hi there !</li>
        </ul>
      </div>
    </SECTION.Frame>
  );
};

export default Banner;
