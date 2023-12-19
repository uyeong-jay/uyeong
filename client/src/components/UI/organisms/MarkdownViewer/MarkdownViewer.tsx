import ReactMarkdown from 'react-markdown';
import components from './components';

interface Props {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

export default MarkdownViewer;
