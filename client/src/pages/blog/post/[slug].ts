import wrapper from '@app/store';
import { getUserData } from '@app/services/api';
import { getPostBySlug } from '@utils/utils-post';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export { default } from '@pages/BlogPost';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
    await store.dispatch(getUserData.initiate());
  }

  const { frontMatter, markdownBody } = await getPostBySlug(params?.slug);

  return {
    props: {
      frontMatter,
      markdownBody,
    },
  };
});
