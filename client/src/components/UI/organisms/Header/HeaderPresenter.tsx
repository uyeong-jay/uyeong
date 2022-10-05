import styled from '@_settings/styled';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserData } from '@slices/userSlice';
import { useState } from 'react';

interface Props {
  userState: {
    userData: UserData | null;
    refresh: {
      success: boolean;
    };
  };
}

const StyledHeader = styled.header`
  border: 1px solid #dadada;
  position: relative;
  width: 100%;
  height: 150px;
`;

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

  & > ul {
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

    & li:nth-of-type(5) {
      border: 1px solid black;
      position: relative;
      cursor: pointer;

      & ul {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
        position: absolute;
        top: 40px;
        right: -2px;
        padding-left: 7px;
        z-index: 9;
        width: 130px;
        height: 200px;
        border-radius: 10px;
      }
    }
  }

  //+스크롤시 nav width만 남도록 하기
`;

const HeaderPresenter = ({ userState }: Props) => {
  const { userData, refresh } = userState;
  const [dropDownMenu, setDropDownMenu] = useState(false);

  //dropdown toggle
  const onClickDropDown = () => {
    setDropDownMenu((prev) => !prev);
  };

  return (
    <>
      <StyledHeader>
        <StyledNav>
          <ul>
            <NavLinkBox href="/">로고 UYeong</NavLinkBox>
            <NavLinkBox href="/blog">Blog</NavLinkBox>
            <NavLinkBox href="/about">About</NavLinkBox>
            <NavLinkBox href="/contact">Contact</NavLinkBox>
            {/* 
              완료: refresh.success(true) , userData - O  
              로그인: refresh.success(true) , userData - X  
              무(초기화 상태):  refresh.success(false) , userData - X
            */}
            {refresh.success ? (
              userData ? (
                <li onClick={onClickDropDown}>
                  <Button variant="" text={`${userData.user?.nickname}`} />
                  <i className="fa-solid fa-caret-down"></i>
                  {!dropDownMenu && (
                    <ul>
                      <li>내 프로필</li>
                      <li>북마크</li>
                      <li>
                        <NavLinkBox href="/logout" passHref={true}>
                          <Button variant="logout" text="Logout" />
                        </NavLinkBox>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <NavLinkBox href="/login" passHref={true}>
                  <Button variant="login" text="Login" />
                </NavLinkBox>
              )
            ) : (
              <li></li>
            )}
          </ul>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default HeaderPresenter;
