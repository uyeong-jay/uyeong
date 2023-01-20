import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from './components';
import { lazy, Suspense } from 'react';
import Loader from '@modals/Loader';
const ReactMarkdown = lazy(() => import('react-markdown'));

interface Props {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </Suspense>
  );
};

export default MarkdownViewer;
