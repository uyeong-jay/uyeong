import { GetStaticProps /* GetStaticProps */ } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { getBlogPosts } from '@app/services/blog/postApi';

export { default } from '@pages/Blog/BlogPage';

//Static, ServerSide 비교
export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async ({ req }: any) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
  }
  store.dispatch(getBlogPosts.initiate());

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
