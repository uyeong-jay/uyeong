import { useCallback, useEffect, useRef, useState } from 'react';
import { HEADER, NAV } from './HeaderStyle';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserResponse } from '@app/services/user/userApi';
import Loader from '@modals/Loader';
import NotFound from '@src/pages/404';
import Image from 'next/image';
import useOnClickOutside from '@hooks/useOnClickOutside';
import CaretDownIcon from '@icons/CaretDownIcon';
import CaretUpIcon from '@icons/CaretUpIcon';
import Logo from '@icons/Logo';
// import ListBarIcon from '@icons/ListBarIcon';

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

  const [isMenuIconClicked, setMenuIconClicked] = useState(false);
  const [render, setRender] = useState(false);

  //width가 833px 보다 커지면 메뉴 클릭 animation 없애기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 833) {
        setRender(false);
        setMenuIconClicked(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //Dropdown
  const onClickUser = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  //Dropdown
  const onClickOutside = useCallback(() => {
    setOpen(false);
  }, []);

  //Dropdown
  useOnClickOutside(dropdownBoxRef, onClickOutside);

  const onClickMenu = useCallback(() => {
    setRender(false); //애니메이션 실행없이 바로 닫기

    const timer = setTimeout(() => {
      setMenuIconClicked(false); //아이콘 애니메이션 실행시간 주기
    }, 400);

    // cleanup function
    return () => clearTimeout(timer);
  }, []);

  const onClickMenuIcon = useCallback(() => {
    setRender(true); //render가 계속 true로 유지되고 있어야 닫는 애니메이션 실행가능
    setMenuIconClicked((prev) => !prev);
  }, []);

  if (getUserDataError || logoutError) return <NotFound />;
  return (
    <>
      {/* 로딩화면 */}
      {getUserDataLoading && <Loader />}
      <HEADER.Layout>
        <NAV.HeaderNav isMenuIconClicked={isMenuIconClicked} render={render}>
          <ul>
            {/* 1 */}
            <NavLinkBox href="/">
              <Logo />
            </NavLinkBox>

            {/* 2 */}
            <li>
              <div>
                <ul onClick={onClickMenu}>
                  <NavLinkBox href="/about" delay={render ? 500 : 0}>
                    About
                  </NavLinkBox>
                  <NavLinkBox href="/blog" delay={render ? 500 : 0}>
                    Blog
                  </NavLinkBox>
                  <NavLinkBox href="/contact" delay={render ? 500 : 0}>
                    Contact
                  </NavLinkBox>
                </ul>
              </div>
            </li>

            {/* 3 */}
            {userData?.user ? (
              <li onClick={onClickUser} ref={dropdownBoxRef}>
                {/* 프로필 이미지 */}
                <div className="header-user-avatar-wrapper header-user-avatar">
                  <Image
                    className="header-user-avatar"
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

            {/* 4 */}
            <li onClick={onClickMenuIcon}>
              <div>
                <span></span>
                <span></span>
              </div>
            </li>
          </ul>
        </NAV.HeaderNav>
      </HEADER.Layout>
    </>
  );
};

export default HeaderPresenter;
