import React from 'react';
import Image from 'next/image';
// import loadSource from '@utils/loadSource';
import styled from '@_settings/styled';

const DIV = {} as any;

DIV.ImageWrapper = styled.div`
  // border: 1px solid red;
  min-width: calc(300px - 8px);
  min-height: calc(50px - 8px);
  position: relative;
  margin: 3px;

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: calc(300px - 8px);
    height: calc(50px - 8px);
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    width: calc(500px - 8px);
    height: calc(80px - 8px);
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: calc(700px - 17px);
    height: calc(110px - 10px);
    margin: 10px;
  }
`;

const GitHubChart = () => {
  return (
    <DIV.ImageWrapper>
      <Image
        // loader={loadSource}
        src="https://ghchart.rshah.org/219138/william-jacob"
        unoptimized={true}
        alt="github chart"
        // objectFit="cover"
        layout="fill" //width, height auto 대체
      />
    </DIV.ImageWrapper>
  );
};

{
  /* <Image
  src={`https://picsum.photos/id/${randomId}/640/340`}
  objectFit="cover"
  layout="fill"
  alt={`alt`}
/> */
}

export default GitHubChart;
