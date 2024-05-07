import HeaderPresenter from './HeaderPresenter';
import { useGetUserDataQuery, useLogoutMutation } from '@app/services/user/userApi';
import { useCallback } from 'react';

const HeaderContainer = () => {
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
    />
  );
};

export default HeaderContainer;
