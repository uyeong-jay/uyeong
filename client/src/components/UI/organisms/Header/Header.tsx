import React from 'react';
import styled from '@_settings/styled';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';

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

  & ul {
    border: 1px solid #dadada;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

    & li a {
      //다크모드
      color: blue;
    }
  }
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <StyledNav>
          <ul>
            <NavLinkBox href="/">로고 UYeong</NavLinkBox>
            <NavLinkBox href="/blog">Blog</NavLinkBox>
            <NavLinkBox href="/about">About</NavLinkBox>
            <NavLinkBox href="/contact">Contact</NavLinkBox>
            <NavLinkBox href="/login" passHref={true}>
              <Button variant="login" text="Login" />
            </NavLinkBox>
          </ul>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default Header;
