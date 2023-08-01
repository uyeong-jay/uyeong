import HeaderPresenter from './HeaderPresenter';
import { useGetUserDataQuery, useLogoutMutation } from '@app/services/user/userApi';
import { useCallback } from 'react';

const HeaderContainer = () => {
  const { data: userData, /* isLoading: getUserDataLoading, */ error: getUserDataError } = useGetUserDataQuery();
  const [logout, { error: logoutError }] = useLogoutMutation();

  const onClickLogout = useCallback(async () => {
    await logout(null);
  }, [logout]);

  return (
    <HeaderPresenter
      userData={userData}
      // getUserDataLoading={getUserDataLoading}
      getUserDataError={getUserDataError}
      onClickLogout={onClickLogout}
      logoutError={logoutError}
    />
  );
};

export default HeaderContainer;
