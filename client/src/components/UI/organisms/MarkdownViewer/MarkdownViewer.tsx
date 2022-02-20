import styled from '@_settings/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from './components';

interface Props {
  content: string;
}

const MarkdownWrapper = styled.div`
  border: 1px solid black;
`;

const MarkdownViewer = ({ content }: Props) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default MarkdownViewer;
