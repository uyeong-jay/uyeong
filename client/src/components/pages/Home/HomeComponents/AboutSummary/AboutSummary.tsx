import React from 'react';
import styled from '@_settings/styled';

const StyledAboutSummary = styled.section`
  border: 1px solid #dadada;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-bottom: 10%;
  border-radius: 30px;
`;

const AboutSummary = () => {
  return <StyledAboutSummary>about</StyledAboutSummary>;
};

export default AboutSummary;
