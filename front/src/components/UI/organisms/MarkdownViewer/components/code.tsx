import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import styled from '@_settings/styled';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const SyntaxWrapper = styled.div`
  width: 500px;
  font-size: 9px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const code = ({ node, inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    //언어 지정
    <SyntaxWrapper>
      <SyntaxHighlighter style={darcula} language={match[1]} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </SyntaxWrapper>
  ) : !inline ? (
    //언어 지정안함
    <SyntaxWrapper>
      <SyntaxHighlighter style={darcula} language="text" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </SyntaxWrapper>
  ) : (
    //강조
    <code className={className ? className : ''}>{children}</code>
  );
};
export default code;
