import React from 'react';
import styled from '@_settings/styled';

const StyledAboutSummary = styled.section`
  border: 1px solid #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 200px;
  margin-bottom: 10%;
  border-radius: 30px;
`;

const AboutSummary = () => {
  return <StyledAboutSummary>about</StyledAboutSummary>;
};

export default AboutSummary;
