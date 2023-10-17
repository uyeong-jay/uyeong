import styled from '@_settings/styled';
import { memo } from 'react';
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

const InlineCodeWrapper = styled.code`
  background: yellow;
`;

const code = ({ inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter {...props} style={prism} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <InlineCodeWrapper {...props} className={className}>
      {children}
    </InlineCodeWrapper>
  );
};
export default memo(code);
