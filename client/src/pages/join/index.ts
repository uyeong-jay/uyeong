import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Join/JoinPage';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
