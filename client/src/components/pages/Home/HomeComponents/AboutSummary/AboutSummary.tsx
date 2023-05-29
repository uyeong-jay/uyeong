import React, { useEffect, useState } from 'react';
import styled from '@_settings/styled';
import About from '@pages/About/AboutPage';
import DetailButton from '@molecules/DetailButton';

const SECTION = {} as any;
const DIV = {} as any;

SECTION.Layout = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 200px;
  width: 100%;
  // height: 100%;

  & > h3 {
    // border: 1px solid black;
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    // margin-top: 5%;
  }
`;

DIV.AboutWrapper = styled.div`
  // border: 1px solid #d2d2d3;
  position: relative;
  width: auto;
  // max-width: ${({ theme }) => theme.BP.PC};
  min-width: 320px;
  // transform: scale(0.8);
  // overflow: hidden;

  & > button {
    // border: 1px solid black;
    position: absolute;
    right: 0px;
    bottom: -60px;
  }
`;

const AboutSummary = () => {
  const [hideInSummary, setHideInSummary] = useState(false);

  useEffect(() => {
    setHideInSummary(true);
  }, []);

  return (
    <SECTION.Layout>
      <h3>About</h3>
      <DIV.AboutWrapper>
        <About hideInSummary={hideInSummary} setHideInSummary={setHideInSummary} />
        <DetailButton link="/about" />
      </DIV.AboutWrapper>
    </SECTION.Layout>
  );
};

export default AboutSummary;
