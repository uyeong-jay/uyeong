import { useCallback, useEffect, useRef, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { lowerHeader } from '@pages/Blog/BlogSlice';

interface Props {
  userData?: UserResponse;
  getUserDataError: any;
  logoutError: any;
  onClickLogout: () => void;
}

const HeaderPresenter = ({ userData, getUserDataError, logoutError, onClickLogout }: Props) => {
  const dispatch = useAppDispatch();
  const [isScrolling, setIsScrolling] = useState(false);

  const isHeaderUp = useAppSelector((state) => state.blog.isHeaderUp);

  const dropdownBoxRef = useRef(null);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const [isMenuIconClicked, setMenuIconClicked] = useState(false);

  const [render, setRender] = useState(false);

  const [scrollDirection, setScrollDirection] = useState('');
  const [prevScrollY, setPrevScrollY] = useState(0);

  //width가 833px 보다 커지면 메뉴 클릭 animation 없애기
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 833) {
        setRender(false);
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

  //마우스 휠(+패드) or 터치 이벤트로 header 숨기거나 보여주기
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleScroll = (event: TouchEvent | WheelEvent) => {
      const scrollY = window.scrollY;
      if (scrollY === 0) setScrollDirection('');
      // Ctrl, Shift, Alt, Meta 키가 눌려있지 않은 경우에만 실행
      if (!(event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) && isScrolling) {
        setMenuIconClicked(false);
        setProfileOpen(false);

        // 스크롤 방향을 결정
        if ('deltaY' in event) {
          if (event.deltaY > 0) {
            setScrollDirection('down');
          } else if (event.deltaY < 0) {
            // 스크롤이 맨꼭대기에 위치하면 효과없이 그냥 리턴
            if (scrollY === 0) return;
            else {
              setScrollDirection('up');
              //blog post의 toc 클릭시 헤더 보이게 하기
              if (isHeaderUp) {
                dispatch(lowerHeader());
              }
            }
          } else {
            return;
          }
        } else if ('touches' in event) {
          const touchEndY = event.touches[0].clientY;
          const mobileDeltaY = touchEndY - touchStartY;
          if (mobileDeltaY > 0) {
            setScrollDirection('down');
          } else if (mobileDeltaY < 0) {
            // 스크롤이 맨꼭대기에 위치하면 효과없이 그냥 리턴
            setScrollDirection('');
            if (scrollY === 0) return;
            else {
              setScrollDirection('up');
              //blog post의 toc 클릭시 헤더 보이게 하기
              if (isHeaderUp) {
                dispatch(lowerHeader());
              }
            }
          } else {
            return;
          }
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [dispatch, isHeaderUp, isScrolling]);

  //뷰포트 스크롤 외 나머지를 스크롤시 헤더를 그대로 두기
  useEffect(() => {
    const currentScrollY = window.scrollY;
    const handleScroll = () => {
      // console.log('1', currentScrollY, prevScrollY); //항상 동일
      setIsScrolling(true);
      setPrevScrollY(currentScrollY);
    };

    const handleWheel = () => {
      // console.log('2', currentScrollY, prevScrollY); //항상 동일
      if (currentScrollY === prevScrollY) {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchmove', handleWheel);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
    };
  }, [prevScrollY]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 이벤트 리스너를 등록하고, 언마운트 시에만 이를 해제

  //스크롤을 직접적으로 클릭 or 터치시 실행
  useEffect(() => {
    //스크롤을 직접적으로 움직일때(mousedown) header 숨기거나 보여주기
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY === 0) {
        if (!isHeaderUp) {
          dispatch(lowerHeader());
        }
        setScrollDirection('up');
      }
      setPrevScrollY(currentScrollY);
    };

    const handleClick = () => {
      window.addEventListener('scroll', handleScroll);
    };

    const handleUnclick = () => {
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('mousedown', handleClick);
    window.addEventListener('mouseup', handleUnclick);
    window.addEventListener('touchstart', handleClick);
    window.addEventListener('touchend', handleUnclick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('mouseup', handleUnclick);
      window.removeEventListener('touchstart', handleClick);
      window.removeEventListener('touchend', handleUnclick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열로 유지해서 컴포넌트가 마운트될 때와 언마운트될 때만 실행시키기

  //Dropdown
  const onClickUser = useCallback(() => {
    setProfileOpen((prev) => !prev);
  }, []);

  //Dropdown
  const onClickOutside = useCallback(() => {
    setProfileOpen(false);
  }, []);

  //Dropdown
  useOnClickOutside(dropdownBoxRef, onClickOutside);

  const onClickMenu = useCallback(() => {
    setRender(false); //애니메이션 실행없이 바로 닫기

    const timer = setTimeout(() => {
      setMenuIconClicked(false); //아이콘 애니메이션 실행시간 추가
    }, 400);

    // cleanup function
    return () => clearTimeout(timer);
  }, []);

  const onClickDownMenuIcon = useCallback(() => {
    setRender(true); //render가 계속 true로 유지되고 있어야 닫는 애니메이션 실행가능
    if (!isMenuIconClicked) {
      setMenuIconClicked(true);
    } else if (isMenuIconClicked) {
      setMenuIconClicked(false);
    }
  }, [isMenuIconClicked]);

  //header menu의 높이(70vh)보다 아래부분 클릭시 메뉴닫힘기능 추가
  useEffect(() => {
    if (isMenuIconClicked) {
      const handleClick = (event: MouseEvent) => {
        // 클릭 이벤트가 발생한 지점의 Y 좌표
        const clickY = event.clientY;

        // 뷰포트의 높이
        const viewportHeight = window.innerHeight;

        // 뷰포트 하단에서부터 30%높이( <=> 70vh: 내려오는 헤더 높이) 지점 계산
        const thresholdY = viewportHeight - viewportHeight * 0.3;

        // 만약 클릭 지점이 기준 높이 이상이라면 동작 수행
        if (clickY >= thresholdY) {
          setMenuIconClicked(false);
        }
      };
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [isMenuIconClicked]);

  if (getUserDataError || logoutError) return <NotFound />;
  return (
    <>
      {/* 로딩화면 */}
      {/* {getUserDataLoading && <Loader />} */}
      <HEADER.Frame scrollDirection={scrollDirection} isHeaderUp={isHeaderUp}>
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
                {isProfileOpen ? <CaretUpIcon /> : <CaretDownIcon />}
                {/* 아래 화살표 클릭시 오픈 */}
                {isProfileOpen &&
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
            <li onClick={onClickDownMenuIcon}>
              <div>
                <span></span>
                <span></span>
              </div>
            </li>
          </ul>
        </NAV.HeaderNav>
      </HEADER.Frame>
    </>
  );
};

export default HeaderPresenter;
