import { useCallback, useState } from 'react';
import { StyledHeader, StyledNav } from './HeaderStyle';
import Button from '@atoms/Button';
import NavLinkBox from '@molecules/NavLinkBox';
import { UserResponse } from '@app/services/api';
import Loader from '@modals/Loader';

interface Props {
  userData: UserResponse | undefined;
  isLoading: boolean;
  error: any;
  onClickLogout: () => void;
}

const HeaderPresenter = ({ userData, isLoading, /* error, */ onClickLogout }: Props) => {
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

  // if (error)
  //   return (
  //     <div>
  //       {error.status} {error.data.msg}
  //     </div>
  //   );
  return (
    <>
      {/* 로딩화면 */}
      {isLoading && <Loader />}
      <StyledHeader>
        <StyledNav>
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
                <Button variant="" text={`${userData.user?.nickname}`} />
                <i className="fa-solid fa-caret-down" />
                {isOpen && (
                  <ul>
                    <NavLinkBox href="/settings">Your activity</NavLinkBox>
                    <NavLinkBox href="/settings">Settings</NavLinkBox>
                    <li>
                      <Button variant="logout" onClick={onClickLogout} text="Logout" />
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <NavLinkBox href="/login" passHref={true}>
                <Button variant="login" text="Login" />
              </NavLinkBox>
            )}
          </ul>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

export default HeaderPresenter;
