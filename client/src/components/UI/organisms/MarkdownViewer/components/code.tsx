import styled from '@_settings/styled';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs';

// import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
// import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
// import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

// const SHRL = (name: string, lang: any) => {
//   SyntaxHighlighter.registerLanguage(name, lang);
// };

// SHRL('js', js);
// SHRL('jsx', jsx);
// SHRL('css', css);

const CodeWrapper = styled.code`
  font-size: 0.9em;
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 15px;
  }

  & > div > code > span {
    color: ${({ theme }) => theme.FONT_C};

    &.comment {
      color: gray;
    }

    //
    &.maybe-class-name {
      color: ${({ theme }) => theme.CODE_MAYBE_CLASS};
    }
    &.imports,
    &.property-access {
      color: ${({ theme }) => theme.CODE_IMPORTS};
    }
    &.punctuation {
      color: ${({ theme }) => theme.CODE_PUNCT};
    }
    &.parameter {
      color: ${({ theme }) => theme.CODE_PARAM};
    }
    &.keyword {
      color: ${({ theme }) => theme.CODE_KEYWORD};
    }
    &.string,
    &.template-string {
      color: ${({ theme }) => theme.CODE_STRING};
    }
    &.tag,
    &.method {
      color: ${({ theme }) => theme.CODE_TAG};
    }
    &.attr-name {
      color: ${({ theme }) => theme.CODE_ATTR_NAME};
    }
    &.attr-value {
      color: ${({ theme }) => theme.CODE_ATTR_VALUE};
    }
    &.class-name {
      color: ${({ theme }) => theme.CODE_CLASS};
    }
    &.language-javascript,
    &.function-variable,
    &.function {
      color: ${({ theme }) => theme.CODE_LANG_JS};
    }
    &.boolean {
      color: ${({ theme }) => theme.CODE_BOOLEAN};
    }
    &.operator {
      color: ${({ theme }) => theme.CODE_OPERATOR};
    }
    &.number {
      color: ${({ theme }) => theme.CODE_NUMBER};
    }
    &.selector {
      color: ${({ theme }) => theme.CODE_SELECTOR};
    }
    &.property {
      color: ${({ theme }) => theme.CODE_PROPERTY};
    }
  }
`;

const InlineCodeWrapper = styled.code`
  font-size: 0.9rem;
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 15px;
  }
`;

const Code = ({ inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <CodeWrapper>
      <SyntaxHighlighter {...props} style={vs} language={match[1]} PreTag="div">
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
