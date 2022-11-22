import { GetServerSideProps /* GetStaticProps */ } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
import { getSortedPosts } from '@utils/utils-post';
import { getRunningOperationPromises, getUserData } from '@app/services/userApi';

export { default } from '@pages/Blog';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
  }

  await Promise.all(getRunningOperationPromises());

  const posts = await getSortedPosts();
  //posts: slug, date, title, description, tags

  return {
    props: {
      posts,
    },
  };
});
