import { GetServerSideProps /* GetStaticProps */ } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
import { getSortedPosts } from '@utils/utils-post';
import { getUserData } from '@app/services/api';

export { default } from '@pages/Blog';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    await store.dispatch(getUserData.initiate());
  }

  const posts = await getSortedPosts();
  //posts: slug, date, title, description, tags

  return {
    props: {
      posts,
      title: 'UYeong Blog',
      description: '제 블로그에 오신걸 환영합니다 🙂👋',
    },
  };
});
