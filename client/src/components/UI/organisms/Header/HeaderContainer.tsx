import HeaderPresenter from './HeaderPresenter';
import { useAppSelector } from '@src/app/hooks';

const HeaderContainer = () => {
  const user = useAppSelector((state) => state.user.user);

  return <HeaderPresenter user={user} />;
};

export default HeaderContainer;
