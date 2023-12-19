import styled from '@_settings/styled';

interface BlockQuoteProps {
  children: React.ReactNode;
}

const StyledBlockquote = styled.blockquote`
  color: #666;
  margin: 0;
  padding-left: 3em;
  border-left: 0.5em #6ff9ff solid;
`;

const Blockquote = ({ children }: BlockQuoteProps) => {
  return <StyledBlockquote>{children}</StyledBlockquote>;
};

export default Blockquote;
