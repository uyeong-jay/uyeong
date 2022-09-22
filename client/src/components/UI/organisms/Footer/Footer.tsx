import React from 'react';
import styled from '@_settings/styled';
import NavLinkBox from '@molecules/NavLinkBox';

const StyledFooter = styled.footer`
  border: 1px solid #dadada;
  background-color: #fef6b5;
  width: 750px;
  height: 190px;
  margin: 10px 0;
  padding: 20px;
  //background-color: #d7d3c8;
  border-radius: 30px;
  color: black;

  & li i {
    color: maroon;
  }

  & li a {
    color: blue;

    & > .fa-instagram {
      margin-left: -2px;
      margin-top: 4px;
      font-size: 20px;
    }

    & > .fa-envelope {
      margin-left: -1px;
    }

    & > .fa-github {
      margin-left: -1px;
      margin-top: 4px;
      font-size: 18px;
    }

    & > .fa-t {
      margin-top: 4px;
      font-size: 18px;
    }
  }

  & p .fa-copyright {
    color: maroon;
    margin-left: -1px;
    margin-top: 4px;
    font-size: 18px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <i className="fa-solid fa-user"></i> UYeong
        </li>
        <NavLinkBox
          href="https://www.instagram.com/__uyeong__/"
          passHref={true}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i> __uyeong__
        </NavLinkBox>
        <NavLinkBox href="mailto: wjacob2103@gmail.com" passHref={true} target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-envelope"></i> wjacob2103@gmail.com
        </NavLinkBox>
        <NavLinkBox href="https://github.com/william-jacob" passHref={true} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i> https://github.com/william-jacob
        </NavLinkBox>
        <NavLinkBox href="https://uyeong-e.tistory.com" passHref={true} target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-t"></i> https://uyeong-e.tistory.com
        </NavLinkBox>
        <li>
          <p>
            <i className="fa-solid fa-copyright"></i> Copyright ⓒ 2022 UYeong Jang All Rights Reserved.
          </p>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
