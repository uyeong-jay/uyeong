import React from 'react';
import styled from '@_settings/styled';

const StyledFooter = styled.footer`
  border: 1px solid #dadada;
  width: 750px;
  height: 150px;
  margin: 10px 0;
  padding: 10px;
  background-color: #d7d3c8;
  border-radius: 30px;
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
