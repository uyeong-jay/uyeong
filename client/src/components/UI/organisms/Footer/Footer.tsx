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
        <NavLinkBox href="mailto: uyeong.jay@gmail.com" passHref={true} target="_blank" rel="noopener noreferrer">
          uyeong.jay@gmail.com
        </NavLinkBox>
        <NavLinkBox href="https://github.com/uyeong-jay" passHref={true} target="_blank" rel="noopener noreferrer">
          github.com/uyeong-jay
        </NavLinkBox>
      </ul>
      <p>Copyright ⓒ 2025 UYeong Jang All rights reserved.</p>
    </FOOTER.Frame>
  );
};

export default Footer;
