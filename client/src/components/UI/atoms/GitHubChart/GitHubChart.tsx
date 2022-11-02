import React from 'react';
import Image from 'next/image';
import { loadSource } from '@utils/loadSource';

const GitHubChart = () => {
  return (
    <>
      <Image
        loader={loadSource}
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
