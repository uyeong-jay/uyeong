import { useCallback, useRef, useState } from 'react';
import { StyledHeader, StyledHeaderNav } from './HeaderStyle';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserResponse } from '@app/services/user/userApi';
import Loader from '@modals/Loader';
import NotFound from '@src/pages/404';
import Image from 'next/image';
import useOnClickOutside from '@hooks/useOnClickOutside';
import CaretDownIcon from '@icons/CaretDownIcon';
import CaretUpIcon from '@icons/CaretUpIcon';

interface Props {
  userData?: UserResponse;
  getUserDataLoading: boolean;
  getUserDataError: any;
  logoutError: any;
  onClickLogout: () => void;
}

const HeaderPresenter = ({ userData, getUserDataLoading, getUserDataError, logoutError, onClickLogout }: Props) => {
  const dropdownBoxRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  //Dropdown lsit
  const onClickList = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  //Dropdown lsit
  const onClickOutside = useCallback(() => {
    setOpen(false);
  }, []);

  //Dropdown lsit
  useOnClickOutside(dropdownBoxRef, onClickOutside);

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
              <li onClick={onClickList} ref={dropdownBoxRef}>
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
                {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
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
