import React from 'react';
import { FOOTER } from './FooterStyle';
import NavLinkBox from '@molecules/NavLinkBox';
import Logo from '@icons/Logo';

const Footer = () => {
  return (
    <FOOTER.Frame>
      <div>
        <Logo />
      </div>
      <ul>
        <li>장우영</li>
        <NavLinkBox href="mailto: wjacob2103@gmail.com" passHref={true} target="_blank" rel="noopener noreferrer">
          wjacob2103@gmail.com
        </NavLinkBox>
        <NavLinkBox href="https://github.com/william-jacob" passHref={true} target="_blank" rel="noopener noreferrer">
          github.com/william-jacob
        </NavLinkBox>
      </ul>
      <p>Copyright ⓒ 2024 UYeong Jang All rights reserved.</p>
    </FOOTER.Frame>
  );
};

export default Footer;
