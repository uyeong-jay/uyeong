import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';

import JoinButton from '@atoms/JoinButton';

const StyledHeader = styled.header`
  border: 1px solid black;
  position: relative;
  width: 100%;
  height: 150px;
`;

//스크롤시 nav width만 남도록 하기
const StyledNav = styled.nav`
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 60px;
`;

const StyledUl = styled.ul`
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ColorLink = styled.a`
  color: #433624;
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <StyledNav>
          <StyledUl>
            <li>
              <Link href="/" passHref>
                <ColorLink>로고 UYeong</ColorLink>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <ColorLink>Blog</ColorLink>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref>
                <ColorLink>About</ColorLink>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <ColorLink>Contact</ColorLink>
              </Link>
            </li>
            <JoinButton />
          </StyledUl>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default Header;
