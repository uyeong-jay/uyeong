import styled from '@_settings/styled';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';

//dark mode
// import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

//light mode
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';

const SHRL = (name: string, lang: any) => {
  SyntaxHighlighter.registerLanguage(name, lang);
};

SHRL('js', js);
SHRL('jsx', jsx);

const CodeWrapper = styled.code`
  font-size: 0.9em;
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 15px;
  }
`;

const InlineCodeWrapper = styled.code`
  padding-left: 13px;
  font-size: 0.9rem;
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 15px;
  }
`;

const Code = ({ inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <CodeWrapper>
      <SyntaxHighlighter {...props} style={prism} language={match[1]} PreTag="div">
        {String(children).replace(/(&nbsp;\n\n)/g, '\n')}
      </SyntaxHighlighter>
    </CodeWrapper>
  ) : (
    <InlineCodeWrapper {...props} className={className}>
      {children}
    </InlineCodeWrapper>
  );
};
export default Code;
