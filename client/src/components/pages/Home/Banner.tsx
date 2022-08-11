import React from 'react';
import styled from '@_settings/styled';

const StyledBanner = styled.section`
  border: 1px solid #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 200px;
  margin-bottom: 10%;
  border-radius: 30px;
`;

const Banner = () => {
  return <StyledBanner>Banner</StyledBanner>;
};

export default Banner;
