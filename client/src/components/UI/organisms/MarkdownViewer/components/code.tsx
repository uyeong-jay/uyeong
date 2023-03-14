import styled from '@_settings/styled';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import cb from 'react-syntax-highlighter/dist/cjs/styles/prism/cb';
// import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
// import vs from 'react-syntax-highlighter/dist/cjs/styles/prism/vs';
import ghcolors from 'react-syntax-highlighter/dist/cjs/styles/prism/ghcolors';

import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';

const SHRL = (name: string, lang: any) => {
  SyntaxHighlighter.registerLanguage(name, lang);
};

SHRL('html', html);
SHRL('xml', xml);
SHRL('css', css);
SHRL('javascript', javascript);
SHRL('typescript', typescript);
SHRL('jsx', javascript);
SHRL('tsx', typescript);
SHRL('json', json);
SHRL('bash', bash);

const SyntaxWrapper = styled.div`
  width: 500px;
`;

const CodeBlock = styled(SyntaxHighlighter)`
  background-color: #444654 !important;

  & code {
    // background-color: #444654;
    color: white !important;
    font-size: 14px !important;
  }
`;

const InlineCodeWrapper = styled.code`
  background: yellow;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const code = ({ node, inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  // console.log('code', match, match?.[1]);

  return match ? (
    //언어 지정
    <SyntaxWrapper>
      <CodeBlock style={ghcolors} language={match[1]} {...props} inline>
        {String(children).replace(/(&nbsp;\n\n)/g, '\n')}
      </CodeBlock>
    </SyntaxWrapper>
  ) : !inline ? (
    //언어 지정안함
    <SyntaxWrapper>
      <CodeBlock style={ghcolors} language="text" {...props}>
        {String(children).replace(/(&nbsp;\n\n)/g, '\n')}
      </CodeBlock>
    </SyntaxWrapper>
  ) : (
    //강조
    <InlineCodeWrapper>
      <code className={className ? className : ''}>{children}</code>
    </InlineCodeWrapper>
  );
};
export default code;
