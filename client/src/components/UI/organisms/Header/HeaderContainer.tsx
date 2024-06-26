import HeaderPresenter from './HeaderPresenter';
import { useGetUserDataQuery, useLogoutMutation } from '@app/services/user/userApi';
import { useCallback } from 'react';

interface HeaderProps {
  isDarkTheme: boolean;
  onClickDarkMode: () => void;
}

const HeaderContainer = ({ isDarkTheme, onClickDarkMode }: HeaderProps) => {
  const { data: userData, isLoading: isLoadingUserData, isError: isUserDataError } = useGetUserDataQuery();
  const [logout, { isLoading: isLoggingOut, isError: isLogoutError }] = useLogoutMutation();

  const onClickLogout = useCallback(async () => {
    await logout(null);
  }, [logout]);

  return (
    <HeaderPresenter
      userData={userData}
      isLoadingUserData={isLoadingUserData}
      isLoggingOut={isLoggingOut}
      isUserDataError={isUserDataError}
      isLogoutError={isLogoutError}
      onClickLogout={onClickLogout}
      isDarkTheme={isDarkTheme}
      onClickDarkMode={onClickDarkMode}
    />
  );
};

export default HeaderContainer;
