import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';

import JoinButton from '@atoms/JoinButton';

const StyledHeader = styled.header`
  position: relative;
  border: 1px solid blue;
  width: 800px;
  margin: auto;
`;

const StyledNav = styled.nav`
  positon: absolute;
  border: 1px solid red;
  width: 500px;
  margin: 0 auto;
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <StyledNav>
          <JoinButton />
          <ul>
            <li>
              <Link href="/">로고 UYeong</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default Header;
