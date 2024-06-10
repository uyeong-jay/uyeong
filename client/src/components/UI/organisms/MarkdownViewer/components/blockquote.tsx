import styled from '@_settings/styled';

interface BlockQuoteProps {
  children: React.ReactNode;
}

const StyledBlockquote = styled.blockquote`
  border-left: 0.3em ${({ theme }) => theme.BD_C}BF solid; //BF: opacity 75%
  margin: 0;
  padding-left: 3em;
  font-weight: bold;
  color: ${({ theme }) => theme.FONT_C}BF; //BF: opacity 75%
`;

const Blockquote = ({ children }: BlockQuoteProps) => {
  return <StyledBlockquote>{children}</StyledBlockquote>;
};

export default Blockquote;
