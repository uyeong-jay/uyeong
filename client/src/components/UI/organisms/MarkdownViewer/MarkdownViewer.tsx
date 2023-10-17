import ReactMarkdown from 'react-markdown';
import components from './components';
import { memo } from 'react';

interface Props {
  content: string;
}

// 이 옵션을 추가하여 전체 내용을 렌더링하도록 설정
const MarkdownViewer = ({ content }: Props) => {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

export default memo(MarkdownViewer);
