import styled from '@_settings/styled';
import ReactMarkdown from 'react-markdown';
import components from './components';

const MarkdownWrapper = styled.div`
  font-size: 14px;
`;

interface Props {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default MarkdownViewer;
