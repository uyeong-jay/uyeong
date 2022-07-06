import React from 'react';
import styled from '@_settings/styled';

const StyledFooter = styled.footer`
  border: 1px solid black;
  width: 100%;
  height: 150px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>사람로고 UYeong 메일로고 wjacob2103@gmail.com 깃헙로고 https://github.com/william-jacob</div>
      <div>Copyright ⓒ 2022 UYeong Jang All Rights Reserved.</div>
    </StyledFooter>
  );
};

export default Footer;
