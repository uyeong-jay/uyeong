import React from 'react';
import styled from '@_settings/styled';
import Link from 'next/link';

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

  & div i {
    color: maroon;
  }

  & div a {
    color: black;
  }

  & div {
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
      <div>
        <i className="fa-solid fa-user"></i> UYeong
      </div>
      <div>
        <i className="fa-brands fa-instagram"></i>
        <Link href="https://www.instagram.com/__uyeong__/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            {' '}
            __uyeong__
          </a>
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-envelope"></i>
        <Link href="mailto: wjacob2103@gmail.com" passHref>
          <a target="_blank" rel="noopener noreferrer">
            {' '}
            wjacob2103@gmail.com
          </a>
        </Link>
      </div>
      <div>
        <i className="fa-brands fa-github"></i>
        <Link href="https://github.com/william-jacob" passHref>
          <a target="_blank" rel="noopener noreferrer">
            {' '}
            https://github.com/william-jacob
          </a>
        </Link>
      </div>
      <div>
        <i className="fa-solid fa-t"></i>
        <Link href="https://uyeong-e.tistory.com" passHref>
          <a target="_blank" rel="noopener noreferrer">
            {' '}
            https://uyeong-e.tistory.com
          </a>
        </Link>
      </div>
      <p>
        <i className="fa-solid fa-copyright"></i> Copyright ⓒ 2022 UYeong Jang All Rights Reserved.
      </p>
    </StyledFooter>
  );
};

export default Footer;
