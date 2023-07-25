import React from 'react';
import styled from '@_settings/styled';
import DetailButton from '@molecules/DetailButton';
import AboutAvatar from '@pages/About/AboutComponents/AboutAvatar/AboutAvatar';

const SECTION = {} as any;
const DIV = {} as any;

SECTION.Layout = styled.section`
  // border: 1px solid red;
  width: 100%; //400px;
  height: 100%;
  position: relative;
`;

DIV.ASTitleWrapper = styled.div`
  // border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;

  & > h3 {
    // border: 1px solid black;
    font-size: 30px;
    font-weight: 400;
    color: ${({ theme }) => theme.FONT_C};
    // letter-spacing: 1px;
`;

DIV.ASContentWarpper = styled.div`
  // border: 1px solid black;
  height: 65%;
  overflow: hidden;

  & > button {
    // border: 1px solid black;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

const AboutSummary = () => {
  return (
    <SECTION.Layout>
      <DIV.ASTitleWrapper>
        <h3>ABOUT</h3>
      </DIV.ASTitleWrapper>
      <DIV.ASContentWarpper>
        <AboutAvatar />
        <DetailButton link="/about" />
      </DIV.ASContentWarpper>
    </SECTION.Layout>
  );
};

export default AboutSummary;
