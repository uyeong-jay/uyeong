import HeaderPresenter from './HeaderPresenter';
import { useRouter } from 'next/router';
import { useGetUserDataQuery, useLogoutMutation } from '@app/services/api';
import { useCallback } from 'react';

const HeaderContainer = () => {
  const { data: userData, isLoading, error } = useGetUserDataQuery();
  const [logout] = useLogoutMutation();

  const router = useRouter();

  const onClickLogout = useCallback(async () => {
    await logout(null);
    router.replace('/');
  }, [logout, router]);

  return <HeaderPresenter userData={userData} isLoading={isLoading} error={error} onClickLogout={onClickLogout} />;
};

export default HeaderContainer;
