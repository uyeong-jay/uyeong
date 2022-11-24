import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
import { getRunningOperationPromises, getUserData } from '@app/services/userApi';
import { getBlogCategories } from '@app/services/blogApi/blogCategoryApi';

export { default } from '@pages/Blog/BlogPage/BlogCategory';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
    store.dispatch(getBlogCategories.initiate());
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
