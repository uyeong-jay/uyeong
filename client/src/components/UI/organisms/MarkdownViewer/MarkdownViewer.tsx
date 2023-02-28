import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from './components';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

interface Props {
  content: string;
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    span: [...(defaultSchema.attributes?.span || []), ['style']],
  },
};

const MarkdownViewer = ({ content }: Props) => {
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
