import React from 'react';
import Image from 'next/image';
import { sourceLoader } from '@utils/sourceLoader';

const GitHubChart = () => {
  return (
    <>
      <Image
        loader={sourceLoader}
        src={'https://ghchart.rshah.org/219138/william-jacob'}
        unoptimized={true}
        alt="github chart"
        width={700}
        height={100}
      />
    </>
  );
};

export default GitHubChart;
