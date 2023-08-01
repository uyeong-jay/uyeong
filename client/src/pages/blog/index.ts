import { GetServerSideProps /* GetStaticProps */ } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
// import { getSortedPosts } from '@utils/utils-post';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import { getBlogPosts } from '@app/services/blog/postApi';

export { default } from '@pages/Blog/BlogPage';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
  }
  store.dispatch(getBlogPosts.initiate());

  await Promise.all(getRunningOperationPromises());

  // const posts = await getSortedPosts();

  return {
    props: {},
  };
});
