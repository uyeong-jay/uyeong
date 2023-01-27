import BlogPostPresenter from './BlogPostPresenter';
import { useRouter } from 'next/router';
import { useGetBlogPostQuery } from '@app/services/blog/postApi';

const BlogPostContainer = () => {
  const router = useRouter();

  const { slug } = router.query;
  console.log(slug);

  const { data: blogPostData } = useGetBlogPostQuery(slug as string);

  const { post: blogPost } = blogPostData || {};

  return <BlogPostPresenter blogPost={blogPost} />;
};

export default BlogPostContainer;
