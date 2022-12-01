import { useCallback, useState } from 'react';
import { StyledHeader, StyledHeaderNav } from './HeaderStyle';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserResponse } from '@app/services/userApi';
import Loader from '@modals/Loader';
import NotFound from '@src/pages/404';
import Image from 'next/image';

interface Props {
  userData: UserResponse | undefined;
  getUserDataLoading: boolean;
  getUserDataError: any;
  logoutError: any;
  onClickLogout: () => void;
}

const HeaderPresenter = ({ userData, getUserDataLoading, getUserDataError, logoutError, onClickLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  //dropdown 버튼 내부 - 클릭시 dropdown toggle
  const onClickDropDown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  //dropdown 버튼 외부 - 마우스가 버튼 내부에서 떠나면 클릭시 dropdown false
  const onClickOutside = useCallback(() => {
    document.removeEventListener('click', onClickOutside);
    setIsOpen(false);
  }, []);

  if (getUserDataError || logoutError) return <NotFound />;
  return (
    <>
      {/* 로딩화면 */}
      {getUserDataLoading && <Loader />}

      <StyledHeader>
        <StyledHeaderNav>
          <ul>
            <NavLinkBox href="/">로고 UYeong</NavLinkBox>
            <NavLinkBox href="/blog">Blog</NavLinkBox>
            <NavLinkBox href="/about">About</NavLinkBox>
            <NavLinkBox href="/contact">Contact</NavLinkBox>
            {userData?.user ? (
              <li
                onClick={onClickDropDown}
                onMouseLeave={() => {
                  document.addEventListener('click', onClickOutside);
                }}
              >
                {/* 프로필 이미지 */}
                <div className="user-avatar-container user-avatar">
                  <Image
                    className="user-avatar"
                    src={userData?.user?.avatar}
                    alt="user avater"
                    width={30}
                    height={30}
                  />
                </div>
                {/* 아래 화살표 */}
                <i className="fa-solid fa-caret-down" />
                {/* 아래 화살표 클릭시 오픈 */}
                {isOpen &&
                  (userData?.user.role === 'admin' ? (
                    <ul>
                      <NavLinkBox href="/write">New post</NavLinkBox>
                      <NavLinkBox href="/settings">Settings</NavLinkBox>
                      <li>
                        <Button variant="logout" onClick={onClickLogout} text="Logout" />
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <NavLinkBox href="/settings">Your activity</NavLinkBox>
                      <NavLinkBox href="/settings">Settings</NavLinkBox>
                      <li>
                        <Button variant="logout" onClick={onClickLogout} text="Logout" />
                      </li>
                    </ul>
                  ))}
              </li>
            ) : (
              <NavLinkBox href="/login" passHref={true}>
                <Button variant="login" text="Login" />
              </NavLinkBox>
            )}
          </ul>
        </StyledHeaderNav>
      </StyledHeader>
    </>
  );
};

export default HeaderPresenter;
