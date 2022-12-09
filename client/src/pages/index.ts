import { GetServerSideProps } from 'next';
import wrapper from '@app/store';
import axios from 'axios';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';

export { default } from '@pages/Home/HomePage';

// Client sdie rendering 에서는
// 브라우저 -> 백서버로 데이터를 보낼 때, 브라우저가 스스로 쿠키를 담아서 보냄

// Server side rendering 에서는
// 프론트서버 -> 백서버로 데이터를 보낼때(getServerSideProps) 프론트서버가 스스로 쿠키를 백서버로 담아서 보내 줄수가 없음
// 따라서 axios에 직접 넣어서 전달해주기

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    store.dispatch(getUserData.initiate());
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
