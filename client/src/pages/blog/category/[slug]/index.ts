import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import { getUserData } from '@app/services/user/userApi';
import { getRunningQueriesThunk } from '@app/services/api';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Blog/BlogPage/BlogCategoryDetail';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});
