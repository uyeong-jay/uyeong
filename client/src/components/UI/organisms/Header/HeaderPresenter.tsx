import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { HEADER, NAV } from './HeaderStyle';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import Image from 'next/image';
import useOnClickOutside from '@hooks/useOnClickOutside';
import CaretDownIcon from '@icons/CaretDownIcon';
import CaretUpIcon from '@icons/CaretUpIcon';
import Logo from '@icons/Logo';
import { useAppSelector } from '@app/hooks';
import UserIcon from '@icons/UserIcon';
import PageLoader from '@modals/PageLoader';

interface Props {
  userData?: UserResponse;
  isLoadingUserData: boolean;
  isLoggingOut: boolean;
  isUserDataError: boolean;
  isLogoutError: boolean;
  onClickLogout: () => void;
}

export let scrollDir = '';
export const scrollAct = {
  UP: 'up',
  DOWN: 'down',
  RESET: '',
};
const { UP, DOWN, RESET } = scrollAct;
let prevScrollY = 0;

const HeaderPresenter = ({
  userData,
  isLoadingUserData,
  isLoggingOut,
  isUserDataError,
  isLogoutError,
  onClickLogout,
}: Props) => {
  const [scrollDirection, setScrollDirection] = useState('');
  const scrollDirForModal = useAppSelector((state) => state.header.scrollDirForModal);

  const dropdownBoxRef = useRef(null);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const [isMenuIconClicked, setMenuIconClicked] = useState(false);
  const [isShowingMenuAni, setShowingMenuAni] = useState(false);
  const [isPageLoading, setPageLoading] = useState(false);

  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  //페이지 로딩시 로더 보여주기
  useEffect(() => {
    const onStartPageLoading = () => {
      timerRef.current = setTimeout(() => {
        setPageLoading(true);
      }, 500);
    };

    const onCompletePageLoading = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', onStartPageLoading);
    router.events.on('routeChangeComplete', onCompletePageLoading);
    router.events.on('routeChangeError', onCompletePageLoading);

    return () => {
      router.events.off('routeChangeStart', onStartPageLoading);
      router.events.off('routeChangeComplete', onCompletePageLoading);
      router.events.off('routeChangeError', onCompletePageLoading);
    };
  }, [router]);

  //width가 833px 보다 커지면 메뉴 클릭 animation 없애기
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 833) {
        setShowingMenuAni(false);
        setMenuIconClicked(false);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', onResize);

    // 컴포넌트가 언마운트 될 때 스크롤 이벤트 리스너 해제
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setMenuIconClicked(false);
      setProfileOpen(false);

      //modal 스크롤
      if (scrollDirForModal === UP) setScrollDirection(UP);
      if (scrollDirForModal === DOWN) setScrollDirection(DOWN);
      if (scrollDirForModal === RESET) {
        //header 스크롤
        if (currentScrollY > prevScrollY) {
          if (scrollDir !== DOWN) {
            setScrollDirection(DOWN); // 헤더 올림
            scrollDir = DOWN;
          }
        } else {
          if (scrollDir !== UP) {
            setScrollDirection(UP); // 헤더 내림
            scrollDir = UP;
          }
        }
      }
      //추적
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirForModal, scrollDirection]);

  //Dropdown
  const onClickProfile = useCallback(() => {
    setProfileOpen((prev) => !prev);
  }, []);

  //Dropdown
  const onClickOutside = useCallback(() => {
    setProfileOpen(false);
  }, []);

  //Dropdown
  useOnClickOutside(dropdownBoxRef, onClickOutside);

  const onClickMenu = useCallback(() => {
    setShowingMenuAni(false); //애니메이션 실행없이 바로 닫기

    const timer = setTimeout(() => {
      setMenuIconClicked(false); //아이콘 애니메이션 실행시간 추가
    }, 400);

    // cleanup function
    return () => clearTimeout(timer);
  }, []);

  const onClickDownMenuIcon = useCallback(() => {
    setShowingMenuAni(true); //isShowingMenuAni가 계속 true로 유지되고 있어야 닫는 애니메이션 실행가능
    if (!isMenuIconClicked) {
      setMenuIconClicked(true);
    } else if (isMenuIconClicked) {
      setMenuIconClicked(false);
    }
  }, [isMenuIconClicked]);

  //header menu의 높이(70vh)보다 아래부분 클릭시 메뉴닫힘기능 추가
  useEffect(() => {
    if (isMenuIconClicked) {
      const handleInteraction = (event: MouseEvent | TouchEvent) => {
        // 클릭or터치 이벤트가 발생한 지점의 Y 좌표
        let clientY;
        if (event.type === 'touchend') {
          clientY = (event as TouchEvent).changedTouches[0].clientY;
        } else {
          clientY = (event as MouseEvent).clientY;
        }

        // 뷰포트의 높이
        const viewportHeight = window.innerHeight;

        // 뷰포트 하단에서부터 30%높이( <=> 70vh: 내려오는 헤더 높이) 지점 계산
        const thresholdY = viewportHeight - viewportHeight * 0.3;

        // 만약 클릭or터치 지점이 기준 높이 이상이라면 동작 수행
        if (clientY >= thresholdY) {
          setMenuIconClicked(false);
        }
      };
      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchend', handleInteraction);

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchend', handleInteraction);
      };
    }
  }, [isMenuIconClicked]);

  if (isUserDataError || isLogoutError) return <NotFound isUserFetchError={isUserDataError} />;
  return (
    <>
      <HEADER.Frame scrollDirection={scrollDirection}>
        <NAV.HeaderNav isMenuIconClicked={isMenuIconClicked} isShowingMenuAni={isShowingMenuAni}>
          <ul>
            {/* 1. 대표로고 */}
            <NavLinkBox href="/">
              <Logo />
            </NavLinkBox>

            {/* 2. 헤더 메뉴 */}
            <li>
              <div>
                <ul onClick={onClickMenu}>
                  <NavLinkBox href="/about">About</NavLinkBox>
                  <NavLinkBox href="/blog">Blog</NavLinkBox>
                  <NavLinkBox href="/contact">Contact</NavLinkBox>
                </ul>
              </div>
            </li>

            {/* 3. 프로필 */}
            {userData?.user ? (
              //로그인 후
              <li onClick={onClickProfile} ref={dropdownBoxRef}>
                {/* 프로필 이미지 */}
                <div className="header-user-avatar-wrapper header-user-avatar">
                  {userData?.user?.avatar ? (
                    <Image
                      className="header-user-avatar"
                      src={userData?.user?.avatar}
                      alt="user avater"
                      width={30}
                      height={30}
                      priority
                    />
                  ) : (
                    <>
                      <UserIcon />
                    </>
                  )}
                </div>
                {/* 아래 화살표 */}
                {isProfileOpen ? <CaretUpIcon /> : <CaretDownIcon />}
                {/* 아래 화살표 클릭시 오픈 */}
                {isProfileOpen &&
                  (userData?.user.role === 'admin' ? (
                    //프로필 메뉴(admin)
                    <ul>
                      <NavLinkBox href="/write">New post</NavLinkBox>
                      <span></span>
                      <NavLinkBox href="/settings">Settings</NavLinkBox>
                      <span></span>
                      <li>
                        <Button variant="logout" onClick={onClickLogout} text="Log out" />
                      </li>
                    </ul>
                  ) : (
                    //프로필 메뉴(user)
                    <ul>
                      <NavLinkBox href="/settings">Settings</NavLinkBox>
                      <span></span>
                      <li>
                        <Button variant="logout" onClick={onClickLogout} text="Log out" />
                      </li>
                    </ul>
                  ))}
              </li>
            ) : (
              <>
                {/* 새로고침시 화면 */}
                {isLoadingUserData || isLoggingOut ? (
                  <li>
                    <div></div>
                  </li>
                ) : (
                  //로그인 전
                  <NavLinkBox href="/login" passHref={true}>
                    <Button variant="login" text="Log in" />
                  </NavLinkBox>
                )}
              </>
            )}

            {/* 4. 헤더 메뉴 아이콘 (반응형) */}
            <li onClick={onClickDownMenuIcon}>
              <div>
                <span></span>
                <span></span>
              </div>
            </li>
          </ul>
        </NAV.HeaderNav>
      </HEADER.Frame>

      {isPageLoading && <PageLoader />}
    </>
  );
};

export default HeaderPresenter;
