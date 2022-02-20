import styled from '@_settings/styled';

interface ParagraphProps {
  children: React.ReactNode[];
}

const Paragraph = styled.p`
  font-size: 14px;
`;

const paragraph = ({ children }: ParagraphProps) => {
  return <Paragraph>{children}</Paragraph>;
};

export default paragraph;
