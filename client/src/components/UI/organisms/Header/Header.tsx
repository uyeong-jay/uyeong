import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';
import Button from '@atoms/Button';

const StyledHeader = styled.header`
  border: 1px solid #dadada;
  position: relative;
  width: 100%;
  height: 150px;
`;

//스크롤시 nav width만 남도록 하기
const StyledNav = styled.nav`
  // background-color: #d3d5c9;
  border: 1px solid #dadada;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 60px;
  border-radius: 30px;
`;

const StyledUl = styled.ul`
  border: 1px solid #dadada;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledAnchor = styled.a`
  color: #433624;
  // color: white;
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <StyledNav>
          <StyledUl>
            <li>
              <Link href="/" passHref>
                <StyledAnchor>로고 UYeong</StyledAnchor>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <StyledAnchor>Blog</StyledAnchor>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref>
                <StyledAnchor>About</StyledAnchor>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <StyledAnchor>Contact</StyledAnchor>
              </Link>
            </li>
            <Link href="/login" passHref>
              <StyledAnchor>
                <Button variant="login" text="Login" type="submit" />
              </StyledAnchor>
            </Link>
          </StyledUl>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default Header;
