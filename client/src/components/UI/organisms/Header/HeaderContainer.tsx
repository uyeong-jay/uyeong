import HeaderPresenter from './HeaderPresenter';
import { useAppSelector } from '@src/app/hooks';
import { useAppDispatch } from '@app/hooks';
import { fetchLogoutData, fetchRefreshData } from '@actions/user';
import { useEffect } from 'react';

const HeaderContainer = () => {
  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  //refresh
  useEffect(() => {
    const login = localStorage.getItem('login');
    //직접 localstorage를 삭제해도 로그아웃이 되게 하여 30일 쿠키 없애 버리기
    if (!login) dispatch(fetchLogoutData(null));
    dispatch(fetchRefreshData(null)); //새로고침
  }, [dispatch]);

  const onClickLogout = () => {
    dispatch(fetchLogoutData(null)); //로그아웃
    dispatch(fetchRefreshData(null)); //새로고침
  };

  return <HeaderPresenter onClickLogout={onClickLogout} userState={userState} />;
};

export default HeaderContainer;
