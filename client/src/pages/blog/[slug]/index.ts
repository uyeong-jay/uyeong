import wrapper from '@app/store';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getBlogPost } from '@app/services/blog/postApi';

export { default } from '@pages/Blog/BlogPage/BlogPost';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
    // store.dispatch(getBlogPosts.initiate()); //blog 페이지에서 새로고침후 수정 버튼눌러 write 페이지로 바로 이동시에 필요
  }
  store.dispatch(getBlogPost.initiate(params?.slug as string));

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
