import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';

import JoinButton from '@atoms/JoinButton';

const StyledHeader = styled.header`
  border: 1px solid black;
  position: relative;
  width: 800px;
  margin: 0 auto;
`;

const StyledNav = styled.nav`
  border: 1px solid black;
  positon: absolute;
  width: 500px;
  height: 100px;
  margin: 0 auto;
`;

const StyledUl = styled.ul`
  border: 1px solid black;
  display: flex;
  flex-direction: cloumn;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const ColorLink = styled.a`
  color: #433624;
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <StyledNav>
          <JoinButton />
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
          </StyledUl>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default Header;
