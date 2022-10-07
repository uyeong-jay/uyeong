import { useState } from 'react';
import styled from '@_settings/styled';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserData } from '@slices/userSlice';

interface Props {
  onClickLogout: () => void;
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
      // border: 1px solid black;
      position: relative;
      cursor: pointer;
      width: 100px;

      & ul {
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40px;
        z-index: 9;
        left: -2px;
        width: 130px;
        height: 200px;
        border-radius: 10px;

        & > li {
          width: 100%;
          height: 100%;

          & > button {
            // border: 1px solid black;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 7px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }

          & > button:hover {
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }

  //+스크롤시 nav width만 남도록 하기
`;

const HeaderPresenter = ({ userState, onClickLogout }: Props) => {
  const { userData, refresh } = userState;
  const [isOpen, setIsOpen] = useState(false);

  //dropdown 버튼 내부 - 클릭시 dropdown toggle
  const onClickDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  //dropdown 버튼 외부 - 마우스가 버튼 내부에서 떠나면 클릭시 dropdown false
  const onClickOutside = () => {
    document.removeEventListener('click', onClickOutside);
    setIsOpen(false);
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
            {refresh.success ? (
              userData ? (
                //로그인 후: refresh.success(true) , userData - O
                <li
                  onClick={onClickDropDown}
                  onMouseLeave={() => {
                    document.addEventListener('click', onClickOutside);
                  }}
                >
                  <Button variant="" text={`${userData.user?.nickname}`} />
                  <i className="fa-solid fa-caret-down"></i>
                  {isOpen && (
                    <ul /* ref={modalEl} */>
                      <li>
                        <Button variant="" onClick={onClickLogout} text="Your profile" />
                      </li>
                      <li>
                        <Button variant="" onClick={onClickLogout} text="Your likes" />
                      </li>
                      <li>
                        <Button variant="logout" onClick={onClickLogout} text="Logout" />
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                //로그인 전: refresh.success(true) , userData - X
                <NavLinkBox href="/login" passHref={true}>
                  <Button variant="login" text="Login" />
                </NavLinkBox>
              )
            ) : (
              //새로고침(초기화) 상태:  refresh.success(false) , userData - X
              <li></li>
            )}
          </ul>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default HeaderPresenter;
