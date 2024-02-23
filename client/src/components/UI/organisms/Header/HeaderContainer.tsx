import HeaderPresenter from './HeaderPresenter';
import { useGetUserDataQuery, useLogoutMutation } from '@app/services/user/userApi';
import { useCallback } from 'react';

const HeaderContainer = () => {
  const { data: userData, isLoading: isLoadingUserData, isError: isUserDataError } = useGetUserDataQuery();
  const [logout, { isLoading: isLoggingout, isError: isLogoutError }] = useLogoutMutation();

  const onClickLogout = useCallback(async () => {
    await logout(null);
  }, [logout]);

  return (
    <HeaderPresenter
      userData={userData}
      isLoadingUserData={isLoadingUserData}
      isLoggingout={isLoggingout}
      isUserDataError={isUserDataError}
      isLogoutError={isLogoutError}
      onClickLogout={onClickLogout}
    />
  );
};

export default HeaderContainer;
