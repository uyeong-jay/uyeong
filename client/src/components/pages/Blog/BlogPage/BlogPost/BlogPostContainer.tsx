import BlogPostPresenter from './BlogPostPresenter';
import { useRouter } from 'next/router';
import { useGetBlogPostQuery } from '@app/services/blog/postApi';

const BlogPostContainer = () => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: blogPostData } = useGetBlogPostQuery(postTitle as string);
  const { post: blogPost } = blogPostData || {};

  return <BlogPostPresenter blogPost={blogPost} />;
};

export default BlogPostContainer;
