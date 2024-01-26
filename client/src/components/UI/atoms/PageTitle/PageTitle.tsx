import styled from '@_settings/styled';
import { memo } from 'react';

interface Props {
  text: string;
}

const StyledPageTitle = styled.h1`
  // border: 1px solid black;
  width: 100%;
  max-width: calc(${({ theme }) => theme.BP.TABLET} - 60px);
  margin: 60px 0 80px 0;
  letter-spacing: 0.5px;
`;

const PageTitle = ({ text }: Props) => {
  return <StyledPageTitle>{text}</StyledPageTitle>;
};

export default memo(PageTitle);
