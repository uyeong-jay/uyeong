import React from 'react';
import { StyledFooter } from './FooterStyle';
import NavLinkBox from '@molecules/NavLinkBox';
import UserIcon from '@icons/UserIcon';
import InstagramIcon from '@icons/InstagramIcon';
import EnvelopeIcon from '@icons/EnvelopeIcon';
import GithubIcon from '@icons/GithubIcon';
import TIcon from '@icons/TIcon';
import CopyrightIcon from '@icons/CopyrightIcon';

//이메일
//깃헙
//인스타
//저작권

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <UserIcon /> UYeong
        </li>
        <NavLinkBox
          href="https://www.instagram.com/__uyeong__/"
          passHref={true}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon /> __uyeong__
        </NavLinkBox>
        <NavLinkBox href="mailto: wjacob2103@gmail.com" passHref={true} target="_blank" rel="noopener noreferrer">
          <EnvelopeIcon /> wjacob2103@gmail.com
        </NavLinkBox>
        <NavLinkBox href="https://github.com/william-jacob" passHref={true} target="_blank" rel="noopener noreferrer">
          <GithubIcon /> https://github.com/william-jacob
        </NavLinkBox>
        <NavLinkBox href="https://uyeong-e.tistory.com" passHref={true} target="_blank" rel="noopener noreferrer">
          <TIcon /> https://uyeong-e.tistory.com
        </NavLinkBox>
        <li>
          <p>
            <CopyrightIcon /> Copyright ⓒ 2023 UYeong Jang All rights reserved.
          </p>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
