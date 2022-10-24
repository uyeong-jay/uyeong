import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
import { getUserData } from '@app/services/api';

export { default } from '@pages/Profile';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    await store.dispatch(getUserData.initiate());
  }

  return {
    props: {},
  };
});
