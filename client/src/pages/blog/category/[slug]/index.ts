import { GetServerSideProps } from 'next';
import axios from 'axios';
import wrapper from '@app/store';
import { getUserData } from '@app/services/user/userApi';
import { getBlogCategories } from '@app/services/blog/categoryApi';
import { getBlogPostsByCategory } from '@app/services/blog/postApi';
import { getRunningOperationPromises } from '@app/services/api';

export { default } from '@pages/Blog/BlogPage/BlogCategoryDetail';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
  }
  store.dispatch(getBlogCategories.initiate());
  store.dispatch(getBlogPostsByCategory.initiate(params?.slug as string));

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
