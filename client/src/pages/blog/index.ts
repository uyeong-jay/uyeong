import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { getBlogPosts } from '@app/services/blog/postApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Blog/BlogPage';

//Static, ServerSide 비교
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }: any) => {
  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  store.dispatch(getBlogPosts.initiate());

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
