import { fetchRefreshData } from '@actions/user';
import wrapper from '@app/store';
import { getPostBySlug } from '@utils/utils-post';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export { default } from '@pages/BlogPost';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
  }

  const { frontMatter, markdownBody } = await getPostBySlug(params?.slug);

  await store.dispatch(fetchRefreshData(null));

  return {
    props: {
      frontMatter,
      markdownBody,
    },
  };
});
