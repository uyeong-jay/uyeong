import { UserResponse } from '@app/services/userApi';
import NotFound from '@src/pages/404';
import WriteMDEditer from '../WriteComponents/WriteMDEditer';
import WriteMDViewer from '../WriteComponents/WriteMDViewer';
import { StyledWrite } from './WriteStyle';
import HideScroll from '@utils/hideScroll';
import WriteMDFooter from '../WriteComponents/WriteMDFooter';

interface Props {
  userData: UserResponse | undefined;
}

const WritePresenter = ({ userData }: Props) => {
  HideScroll();

  if (userData?.user?.role !== 'admin') return <NotFound />;
  return (
    <StyledWrite>
      <WriteMDEditer />
      <WriteMDViewer />
      <WriteMDFooter />
    </StyledWrite>
  );
};

export default WritePresenter;
