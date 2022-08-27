import { GetStaticProps } from 'next';
import { getSortedPosts } from '@utils/utils-post';

export { default } from '@pages/Blog';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  //posts: slug, date, title, description, tags

  return {
    props: {
      posts,
      title: 'UYeong Blog',
      description: '제 블로그에 오신걸 환영합니다 🙂👋',
    },
  };
};
