import React from 'react';
import styled from '@_settings/styled';
import DetailButton from '@molecules/DetailButton';
import AboutAvatar from '@pages/About/AboutComponents/AboutAvatar/AboutAvatar';
import SummaryTitle from '../SummaryTitle';

const SECTION = {} as any;
const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
`;

DIV.ASContentWarpper = styled.div`
  // border: 1px solid green;
  height: 60%;
  overflow: hidden;

  & > button {
    // border: 1px solid black;
    position: absolute;
    right: 15px;
    bottom: 10px;
  }
`;

const AboutSummary = () => {
  return (
    <SECTION.Frame>
      <SummaryTitle text="ABOUT" />
      <DIV.ASContentWarpper>
        <AboutAvatar />
        <DetailButton link="/about" />
      </DIV.ASContentWarpper>
    </SECTION.Frame>
  );
};

export default AboutSummary;
