import styled from '@_settings/styled';
import { memo } from 'react';

interface BlockQuoteProps {
  children: React.ReactNode;
}

const Blockquote = styled.blockquote`
  color: #666;
  margin: 0;
  padding-left: 3em;
  border-left: 0.5em #6ff9ff solid;
`;

const blockquote = ({ children }: BlockQuoteProps) => {
  return <Blockquote>{children}</Blockquote>;
};

export default memo(blockquote);
