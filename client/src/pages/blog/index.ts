import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import { getRunningQueriesThunk } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';
import { getBlogTags } from '@app/services/blog/tagApi';

export { default } from '@pages/Blog/BlogPage';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }: any) => {
  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  store.dispatch(getBlogTags.initiate({ limit: 50 }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});
