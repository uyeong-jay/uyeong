import React from 'react';
import styled from '@_settings/styled';
import About from '@pages/About/AboutPage';

const SECTION = {} as any;
const DIV = {} as any;

SECTION.Layout = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  width: 100%;
  height: 700px;
  overflow: hidden;

  & > h3 {
    // border: 1px solid black;
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    margin-top: 5%;
  }
`;

DIV.Wrapper = styled.div`
  border: 5px solid #d2d2d3;
  border-radius: 30px;
  transform: scale(0.7);
  width: 100%;
  height: 100%;
  margin-top: -50px;
  overflow: hidden;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    border-radius: 50%;
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 50%;
  }
  ::-webkit-scrollbar-thumb {
    background: #afafb0;
    border-radius: 10px;
  }
`;

const AboutSummary = () => {
  return (
    <SECTION.Layout>
      <h3>About</h3>
      <DIV.Wrapper>
        <About />
      </DIV.Wrapper>
    </SECTION.Layout>
  );
};

export default AboutSummary;
