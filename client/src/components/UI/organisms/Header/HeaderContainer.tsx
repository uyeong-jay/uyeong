import HeaderPresenter from './HeaderPresenter';
import { useRouter } from 'next/router';
import { useGetUserDataQuery, useLogoutMutation } from '@app/services/api';

const HeaderContainer = () => {
  const { data: userData, isLoading, error } = useGetUserDataQuery();
  const [logout] = useLogoutMutation();
  console.log(userData);

  const router = useRouter();

  const onClickLogout = async () => {
    await logout(null);
    router.replace('/');
  };

  return <HeaderPresenter userData={userData} isLoading={isLoading} error={error} onClickLogout={onClickLogout} />;
};

export default HeaderContainer;
