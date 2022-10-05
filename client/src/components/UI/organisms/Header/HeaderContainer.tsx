import HeaderPresenter from './HeaderPresenter';
import { useAppSelector } from '@src/app/hooks';
import { useAppDispatch } from '@app/hooks';
import { fetchRefreshData } from '@actions/user';
import { useEffect } from 'react';

const HeaderContainer = () => {
  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  //refresh
  useEffect(() => {
    dispatch(fetchRefreshData(null));
  }, [dispatch]);
  console.log('refresh.success:', userState.refresh.success);

  return <HeaderPresenter userState={userState} />;
};

export default HeaderContainer;
