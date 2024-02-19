import React from 'react';
import styled from '@_settings/styled';

interface SummaryTitleProps {
  text: string;
}

const StyledSummaryTitle = styled.div`
  // border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 25%;

  & > h3 {
    // border: 1px solid black;
    font-size: 30px;
    font-weight: 400;
    color: ${({ theme }) => theme.FONT_C};
  }

  @media screen and (min-height: 500px) and (min-width: 850px) {
    align-items: center;
  }
`;

const SummaryTitle = ({ text }: SummaryTitleProps) => {
  return (
    <StyledSummaryTitle>
      <h3>{text}</h3>
    </StyledSummaryTitle>
  );
};

export default SummaryTitle;
