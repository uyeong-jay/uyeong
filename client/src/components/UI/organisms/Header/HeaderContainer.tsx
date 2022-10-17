import HeaderPresenter from './HeaderPresenter';
import { useAppSelector } from '@src/app/hooks';
import { useAppDispatch } from '@app/hooks';
import { fetchLogoutData } from '@actions/user';
import { useRouter } from 'next/router';

const HeaderContainer = () => {
  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onClickLogout = async () => {
    await dispatch(fetchLogoutData(null)); //로그아웃
    router.replace('/');
  };

  return <HeaderPresenter onClickLogout={onClickLogout} userState={userState} />;
};

export default HeaderContainer;
