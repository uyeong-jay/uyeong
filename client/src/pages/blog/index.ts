import { GetStaticProps } from 'next';
import { getSortedPosts } from '@lib/utils-post';

export { default } from '@pages/Blog';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();

  return {
    props: {
      posts,
      title: 'Blog',
      description: 'Posts on software engineering',
    },
  };
};
