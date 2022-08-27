import { getPostSlugs, getPostBySlug } from '@src/utils/utils-post';
import { Params } from '@_types/types-blog';

export { default } from '@pages/BlogPost';

export const getStaticPaths = async () => {
  const paths = await getPostSlugs();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { frontMatter, markdownBody } = await getPostBySlug(params.slug);

  return {
    props: {
      frontMatter,
      markdownBody,
    },
  };
};
