import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.ChristmasWrapper = styled.div`
  // border: 10px solid red;
  position: fixed;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;

  & div {
    transform-style: preserve-3d;
  }

  & > .christmas-msg {
    // border: 1px solid green;
    position: absolute;
    z-index: 10000;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    text-align: center;

    @font-face {
      font-family: 'mountains_of_christmasregular';
      src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/mountainsofchristmas-webfont.woff2') format('woff2'),
        url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/mountainsofchristmas-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    & > span {
      font-family: mountains_of_christmasregular;
      font-size: 2rem;
      text-align: center;
      color: #ffffff;
      letter-spacing: 1px;

      opacity: 1;

      /* 왼쪽만 0% 보이게 */
      clip-path: inset(0 100% 0 0);

      /* 애니메이션 설정 */
      /* ⭐ 트리 애니메이션 끝난 뒤 */
      animation: text-reveal 1.2s ease forwards;
    }

    & > .title {
      display: inline-block;
      animation-delay: 4s;
    }

    & > .signature {
      position: absolute;
      right: 20px;
      bottom: -50px;
      font-size: 1.2rem;
      opacity: 0.9;
      animation-delay: 5.2s;

      @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
        right: 20px;
        bottom: -50px;
      }

      @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
        right: 0px;
        bottom: -70px;
      }
    }

    @keyframes text-reveal {
      to {
        clip-path: inset(0 0 0 0);
      }
    }
  }

  & > .christmas-tree {
    // border: 3px solid yellow;
    place-content: center;
    overflow-x: hidden;
    margin: 0;
    height: 100vh;
    perspective: 35em;
    background: #000014;
  }

  & .christmas-tree,
  .a3d {
    display: grid;

    & > .preparing {
      opacity: 0;
    }

    & > .ready {
      opacity: 1;
      transition: opacity 0s linear 0.2s; /* 0.2초 뒤 적용 */
    }

    & > .a3d {
      --m: calc(0.5 * (var(--n-stars) - 1));
      --t: calc(0.33333 * var(--n-stars) * 0.1s);
      animation: roty 12s linear var(--t) infinite reverse;

      @keyframes roty {
        to {
          rotate: y 1turn;
        }
      }

      & .🌟 {
        position: relative;

        --q: Min(1, var(--j));
        --p: calc(1 - var(--q));
        --s: calc((1.25 * var(--p) + var(--q) * var(--sf)) * 2em);
        --ay0: calc(var(--i) / var(--n-arms) * 1turn);
        --ay1: calc(var(--ay0) - var(--n-loops) * 1turn);

        --ay: calc((var(--j) / var(--n-stars) * var(--n-loops) + var(--i) / var(--n-arms)) * 1turn);

        --tx: calc(var(--q) * var(--rox) * 2em);
        --ty0: calc(var(--m) / var(--n-stars) * 20em);
        --ty1: calc(-1 * var(--ty0) - 0.75 * 2em);
        --ty: calc((var(--j) - var(--m)) / var(--n-stars) * 20em + (var(--q) * var(--roy) - var(--p) * 0.75) * 2em);
        --tz: calc(var(--j) / var(--n-stars) * 10em + var(--q) * var(--roz) * 2em);
        grid-area: 1/ 1;
        width: var(--s);
        height: var(--s);
        --pos: rotatey(var(--ay)) translate3d(var(--tx), var(--ty), var(--tz)) rotatey(calc(-1 * var(--ay)));
        transform: var(--pos);

        --dt: calc(0.33333 * (var(--n-stars) - var(--j)) * 0.1s);
        animation: grow calc(var(--q) * 0.1s) ease-out var(--dt) backwards, move calc(var(--p) * var(--t)) linear;

        &::after {
          content: '';
          position: absolute; /* ⭐ 필수 */
          inset: -20%; /* ⭐ width/height 대체 */
          border: 5px solid #fffacd;

          opacity: calc(var(--p) + var(--q) * var(--j) / var(--n-stars) + 0.25);

          background: radial-gradient(#fffacd 10%, rgba(255, 250, 205, 0.2));

          --points: 50% 0%, 53.53553% 41.46447%, 85.35534% 14.64466%, 58.53553% 46.46447%, 100% 50%, 58.53553% 53.53553%,
            85.35534% 85.35534%, 53.53553% 58.53553%, 50% 100%, 46.46447% 58.53553%, 14.64466% 85.35534%,
            41.46447% 53.53553%, 0% 50%, 41.46447% 46.46447%, 14.64466% 14.64466%, 46.46447% 41.46447%;

          -webkit-clip-path: polygon(var(--points));
          clip-path: polygon(var(--points));
          animation: roty 12s linear var(--t) infinite, puls calc(var(--p) * 0.1s) ease-in-out infinite alternate,
            hue 4s linear var(--dt) infinite;
        }
      }

      @keyframes puls {
        to {
          scale: 0.2;
          opacity: 0.2;
        }
      }

      @keyframes hue {
        to {
          filter: hue-rotate(360deg);
        }
      }

      @keyframes grow {
        0% {
          transform: var(--pos) scale(0);
        }
      }

      @keyframes move {
        0% {
          transform: rotatey(var(--ay0)) translate3d(0, var(--ty0), 10em) rotatey(calc(-1 * var(--ay0)));
        }
        100% {
          transform: rotatey(var(--ay1)) translate3d(0, var(--ty1), 0) rotatey(calc(-1 * var(--ay1)));
        }
      }
    }
  }
`;
