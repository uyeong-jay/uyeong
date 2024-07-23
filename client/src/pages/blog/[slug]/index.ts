import wrapper from '@app/store';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { GetServerSideProps } from 'next';
import { getBlogPost } from '@app/services/blog/postApi';
import { setAxiosCookie } from '@utils/setAxiosCookie';

export { default } from '@pages/Blog/BlogPage/BlogPost';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  setAxiosCookie(req);

  if (req.headers.cookie) {
    store.dispatch(getUserData.initiate());
  }

  store.dispatch(getBlogPost.initiate(params?.slug as string));

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
