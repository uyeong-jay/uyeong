import HeaderPresenter from './HeaderPresenter';
import { useAppDispatch } from '@app/hooks';
import { fetchLogoutData } from '@actions/user';
import { useRouter } from 'next/router';
import { useGetUserDataQuery } from '@slices/api/apiSlice';

const HeaderContainer = () => {
  const { data: userData, isLoading, isError } = useGetUserDataQuery();
  console.log(userData);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onClickLogout = async () => {
    await dispatch(fetchLogoutData(null)); //로그아웃
    router.replace('/');
  };

  return <HeaderPresenter userData={userData} isLoading={isLoading} isError={isError} onClickLogout={onClickLogout} />;
};

export default HeaderContainer;
