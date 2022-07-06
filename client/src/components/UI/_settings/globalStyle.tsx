import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        /* 테두리까지 포함시켜 보다 직관적이게 상자 크기 조절을 가능 */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
        }

        /* 기본 마진 제거, 백분율 기반 높이 사용 가능 */
        html,
        body,
        #__next {
          width: 100%;
          height: 100%;
        }

        /* 줄 높이 지정, 글꼴 지정, 텍스트 렌더링 개선 */
        body {
          line-height: 1.5; //줄 높이 글자 크기의 1.5배
          font-family: 'Noto Sans KR', sans-serif;
          -webkit-font-smoothing: antialiased;
          background-color: #f4f1e9;
        }

        /* 텍스트 삐져나감 방지 */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          overflow-wrap: break-word;
        }

        h1 {
          font-size: 30px;
        }

        /* 미디어 기본값 inline > block, 삐져나감 방지 */
        img,
        picture,
        video,
        canvas,
        svg {
          display: block;
          max-width: 100%;
        }

        /* 기본 제공 font가 아닌 현재 사용하는 font로 유지 */
        input,
        button,
        textarea,
        select {
          font: inherit;
        }

        /* 원하는 태그 기본 스타일 제거 */
        button {
          background: none;
          border: none;
          cursor: pointer;
        }
        a {
          text-decoration: none;
          outline: none;
        }
        ul {
          list-style: none;
          padding-left: 0;
          // list-style-type: '- '
        }

        /* z-index 없이도 항상 새로운 쌓임 순서 생성가능 */
        #root, //React.js 최상위 요소 선택자
        #__next {
          //Next.js 최상위 요소 선택자
          isolation: isolate;
        }
      `}
    />
  );
};

export default GlobalStyle;
