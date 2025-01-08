import BlogPostPresenter from './BlogPostPresenter';
import { useRouter } from 'next/router';
import { useGetBlogPostQuery } from '@app/services/blog/postApi';
import { CloudinaryTypes } from '@src/pages/settings';

interface Props {
  cloudinaryConfig: CloudinaryTypes;
}

const BlogPostContainer = ({ cloudinaryConfig }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: blogPostData } = useGetBlogPostQuery(postTitle as string);
  const { post: blogPost } = blogPostData || {};

  return <BlogPostPresenter blogPost={blogPost} cloudinaryConfig={cloudinaryConfig} />;
};

export default BlogPostContainer;
