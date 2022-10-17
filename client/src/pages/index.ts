import { GetServerSideProps } from 'next/types';
import wrapper from '@app/store';
import { fetchRefreshData } from '@actions/user';
import axios from 'axios';
export { default } from '@pages/Home';

// Client sdie rendering 에서는
// 브라우저 -> 백서버로 데이터를 보낼 때, 브라우저가 쿠키를 담아서 보냄

// Server side rendering 에서는
// 프론트서버 -> 백서버로 데이터를 보낼때(getServerSideProps) 프론트서버에서는 쿠키를 백서버로 담아서 보내 줄수가 없음(서로 다른 도메인이기 때문) 따라서 axios에 직접 넣어서 전달해주기

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
  }

  await store.dispatch(fetchRefreshData(null));

  return {
    props: {},
  };
});
