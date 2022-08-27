import React from 'react';
import Image from 'next/image';
import { sourceLoader } from '@src/utils/sourceLoader';

const GitHubChart = () => {
  return (
    <>
      <Image
        loader={sourceLoader}
        src={'https://ghchart.rshah.org/219138/william-jacob'}
        alt="github chart"
        width={700}
        height={100}
      />
    </>
  );
};

export default GitHubChart;
