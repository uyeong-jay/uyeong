import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from './components';
import Loader from '@modals/Loader';
import dynamic from 'next/dynamic';
const ReactMarkdown: any = dynamic(() => import('react-markdown') as any, { loading: () => <Loader />, ssr: false });

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
