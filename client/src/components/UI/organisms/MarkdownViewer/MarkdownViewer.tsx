import components from './components';
import styled from '@_settings/styled';
import MiniLoader from '@atoms/MiniLoader';
import dynamic from 'next/dynamic';
// import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
}

// 동적 import > ReactMarkdown 코드 스플릿
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => (
    <div className="mini-loader-wrapper">
      <MiniLoader w={25} />
    </div>
  ),
  ssr: false, // ssr비활성화 (client측 로드)
});

const MarkdownWrapper = styled.div`
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  color: ${({ theme }) => theme.FONT_C_POST};

  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 40px 0 8px 0;
  }

  & > ul {
    list-style: disc;
    margin: 0 0 20px 40px;

    & li {
      margin: 5px 0 0 -10px;

      & ul {
        list-style: disc;
        margin: 0 0 20px 35px;
      }
    }
  }

  & > p {
    margin-bottom: 15px;
  }

  & > p a {
    color: ${({ theme }) => theme.FONT_C};
    padding-bottom: 2px;
    border-bottom: 1px solid ${({ theme }) => theme.FONT_C};
  }

  & p img {
    margin: 1rem auto;
    border-radius: 15px;
  }

  & > pre > code > div {
    border: 3px solid ${({ theme }) => theme.BD_C}4C; //4C: opacity 30%
    background-color: ${({ theme }) => theme.BG_C} !important;
    transition: background-color 0.25s linear; // for theme mode
    border-radius: 20px;
    margin: 30px 0;
    padding: 15px !important;

    overflow-x: scroll;
    overflow-y: hidden;

    ::-webkit-scrollbar {
      border-radius: 50%;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      margin: 0 15px;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.BD_C}4C; //4C: opacity 30%
      border-radius: 10px;
    }
  }

  & > .mini-loader-wrapper {
    display: none;
  }
`;

const MarkdownViewer = ({ content }: Props) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default MarkdownViewer;
