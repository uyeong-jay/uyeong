import React from 'react';
import { StyledFooter } from './FooterStyle';
import NavLinkBox from '@molecules/NavLinkBox';

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <i className="fa-solid fa-user" /> UYeong
        </li>
        <NavLinkBox
          href="https://www.instagram.com/__uyeong__/"
          passHref={true}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram" /> __uyeong__
        </NavLinkBox>
        <NavLinkBox href="mailto: wjacob2103@gmail.com" passHref={true} target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-envelope" /> wjacob2103@gmail.com
        </NavLinkBox>
        <NavLinkBox href="https://github.com/william-jacob" passHref={true} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github" /> https://github.com/william-jacob
        </NavLinkBox>
        <NavLinkBox href="https://uyeong-e.tistory.com" passHref={true} target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-t" /> https://uyeong-e.tistory.com
        </NavLinkBox>
        <li>
          <p>
            <i className="fa-solid fa-copyright" /> Copyright ⓒ 2022 UYeong Jang All Rights Reserved.
          </p>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
