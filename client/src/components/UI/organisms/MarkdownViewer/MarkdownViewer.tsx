import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from './components';

interface Props {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
